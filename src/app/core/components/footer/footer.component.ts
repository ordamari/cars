import { Component, OnInit } from '@angular/core'
import { CountService } from '@core/services/count-service/count.service'
import { DataService } from '@core/services/data-service/data.service'
import { Observable, combineLatest, map } from 'rxjs'

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    constructor(
        private dataService: DataService,
        private countService: CountService
    ) {}

    $percent = new Observable<number>()

    ngOnInit(): void {
        this.$percent = combineLatest(
            this.dataService.$dataItems,
            this.countService.$count
        ).pipe(
            map(([dataItems, count]) => {
                const percent = (dataItems.length / count) * 100
                return Math.round(percent)
            })
        )
    }
}
