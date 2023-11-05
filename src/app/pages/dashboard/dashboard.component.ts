import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { DataService } from '@core/services/data-service/data.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
    constructor(private dataService: DataService) {}
    $dataItems = this.dataService.$dataItems
    @ViewChild('cardRef', { read: ElementRef }) cardRef: ElementRef | null =
        null

    width = 300

    updateWidth(): void {
        const newWidth = this.cardRef?.nativeElement.clientWidth - 50 || 300
        this.width = newWidth > 0 ? newWidth : 300
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.updateWidth()
        }, 100)
    }
}
