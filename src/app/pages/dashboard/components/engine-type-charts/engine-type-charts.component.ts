import { Component, Input, OnInit } from '@angular/core'
import { LegendPosition } from '@swimlane/ngx-charts'
import { Observable, map } from 'rxjs'
import { Data } from 'src/app/shared/models/data.model'

type ChartData = {
    name: string
    value: number
}

@Component({
    selector: 'app-engine-type-charts',
    templateUrl: './engine-type-charts.component.html',
    styleUrls: ['./engine-type-charts.component.css'],
})
export class EngineTypeChartsComponent implements OnInit {
    @Input() $dataItems!: Observable<Data[]>
    @Input() width!: number

    $chartData: Observable<ChartData[]> = new Observable()

    gradient: boolean = false
    showLegend: boolean = false
    showLabels: boolean = true
    isDoughnut: boolean = true
    legendPosition: LegendPosition = LegendPosition.Below

    ngOnInit(): void {
        this.$chartData = this.$dataItems.pipe(
            map((dataItems) => {
                return dataItems.reduce((acc, dataItem) => {
                    const motorTypeIndex = acc.findIndex(
                        (item) => item.name === dataItem.motorType
                    )
                    if (motorTypeIndex === -1) {
                        acc.push({ name: dataItem.motorType, value: 1 })
                    } else {
                        acc[motorTypeIndex].value++
                    }
                    return acc
                }, [] as ChartData[])
            })
        )
    }
}
