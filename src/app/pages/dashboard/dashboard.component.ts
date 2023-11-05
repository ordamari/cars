import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core'
import { DataService } from 'src/app/core/services/data-service/data.service'

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

    width = 200

    updateWidth(): void {
        const newWidth = this.cardRef?.nativeElement.clientWidth - 50 || 500
        console.log({ newWidth })

        this.width = newWidth > 0 ? newWidth : 200
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.updateWidth()
        }, 100)
    }
}
