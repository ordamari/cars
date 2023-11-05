import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    constructor(private sanitizer: DomSanitizer) {}
    imageSrc: SafeResourceUrl | undefined

    ngOnInit() {
        const imagePath = 'assets/images/logo.png' // Replace with the path to your image
        this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(imagePath)
    }
}
