import { Component, Input, OnInit } from '@angular/core'
import { Observable, map, tap } from 'rxjs'
import { Data } from '@shared/models/data.model'

type AgeGroup = '0-18' | '19-30' | '31-50' | '51-70' | '71+'
type DataItemWithAgeGroup = Data & { ageGroup: AgeGroup }

type ChartData = {
    name: string
    series: [
        {
            name: '0-18'
            value: number
        },
        {
            name: '19-30'
            value: number
        },
        {
            name: '31-50'
            value: number
        },
        {
            name: '51-70'
            value: number
        },
        {
            name: '71+'
            value: number
        }
    ]
}

type CustomColor = { name: string; value: string }

@Component({
    selector: 'app-color-age-charts',
    templateUrl: './color-age-charts.component.html',
    styleUrls: ['./color-age-charts.component.css'],
})
export class ColorAgeChartsComponent implements OnInit {
    legend: boolean = false
    showLabels: boolean = false
    animations: boolean = true
    xAxis: boolean = true
    yAxis: boolean = true
    showYAxisLabel: boolean = false
    showXAxisLabel: boolean = false
    xAxisLabel: string = ''
    yAxisLabel: string = ''
    timeline: boolean = false

    @Input() $dataItems!: Observable<Data[]>
    @Input() width!: number

    $dataItemsWithAgeGroup: Observable<DataItemWithAgeGroup[]> =
        new Observable()
    $chartData: Observable<ChartData[]> = new Observable()
    $customColors: Observable<CustomColor[]> = new Observable()

    private getAge(birthDate: Date) {
        var today = new Date()
        var age = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    private getAgeGroup(dateOfBirth: Date): AgeGroup {
        const age = this.getAge(dateOfBirth)
        if (age <= 18) {
            return '0-18'
        } else if (age <= 30) {
            return '19-30'
        } else if (age <= 50) {
            return '31-50'
        } else if (age <= 70) {
            return '51-70'
        } else {
            return '71+'
        }
    }

    private getColorDataClearItem(color: string): ChartData {
        return {
            name: color,
            series: [
                {
                    name: '0-18',
                    value: 0,
                },
                {
                    name: '19-30',
                    value: 0,
                },
                {
                    name: '31-50',
                    value: 0,
                },
                {
                    name: '51-70',
                    value: 0,
                },
                {
                    name: '71+',
                    value: 0,
                },
            ],
        }
    }

    ngOnInit(): void {
        this.$dataItemsWithAgeGroup = this.$dataItems.pipe(
            map((dataItems) =>
                dataItems.map((dataItem) => ({
                    ...dataItem,
                    ageGroup: this.getAgeGroup(dataItem.dateOfBirth),
                }))
            )
        )

        this.$chartData = this.$dataItemsWithAgeGroup.pipe(
            map((dataItemsWithAgeGroup) => {
                return dataItemsWithAgeGroup.reduce((acc, dataItem) => {
                    const colorIndex = acc.findIndex(
                        (item) => item.name === dataItem.color
                    )
                    if (colorIndex === -1) {
                        const clearColorData = this.getColorDataClearItem(
                            dataItem.color
                        )
                        const ageGroupIndex = clearColorData.series.findIndex(
                            (item) => item.name === dataItem.ageGroup
                        )
                        clearColorData.series[ageGroupIndex].value++
                        acc.push(clearColorData)
                    } else {
                        const ageGroupIndex = acc[colorIndex].series.findIndex(
                            (item) => item.name === dataItem.ageGroup
                        )
                        acc[colorIndex].series[ageGroupIndex].value++
                    }
                    return acc
                }, [] as ChartData[])
            })
        )

        this.$customColors = this.$chartData.pipe(
            map((chartData) => {
                return chartData.map((item) => ({
                    name: item.name,
                    value: item.name,
                }))
            })
        )
    }
}
