import { Component, Input, OnInit } from '@angular/core'
import { Observable, map } from 'rxjs'
import { Data } from 'src/app/shared/models/data.model'

type ChartData = {
    name: string
    value: number
}

@Component({
    selector: 'app-hobbies-charts',
    templateUrl: './hobbies-charts.component.html',
    styleUrls: ['./hobbies-charts.component.css'],
})
export class HobbiesChartsComponent implements OnInit {
    @Input() $dataItems!: Observable<Data[]>
    @Input() width!: number

    // options
    showXAxis = true
    showYAxis = true
    gradient = false
    showLegend = true
    showXAxisLabel = true
    xAxisLabel = 'Country'
    showYAxisLabel = true
    yAxisLabel = 'Population'

    $chartData: Observable<ChartData[]> = new Observable()

    ngOnInit(): void {
        this.$chartData = this.$dataItems.pipe(
            map((dataItems) => {
                return dataItems.reduce((acc, dataItem) => {
                    dataItem.hobbies.forEach((hobby) => {
                        const hobbyIndex = acc.findIndex(
                            (item) => item.name === hobby
                        )
                        if (hobbyIndex === -1) {
                            acc.push({ name: hobby, value: 1 })
                        } else {
                            acc[hobbyIndex].value++
                        }
                    })
                    return acc
                }, [] as ChartData[])
            })
        )
    }
}
