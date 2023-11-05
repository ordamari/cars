import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ensureModuleLoadedOnce } from '@core/guards/ensureModuleLoadedOnce.guard'
import { HeaderComponent } from '@core/components/header/header.component'
import { FooterComponent } from '@core/components/footer/footer.component'
import { RouterModule } from '@angular/router'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { ToastrModule } from 'ngx-toastr'

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        ToastrModule.forRoot(),
    ],
    exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        ensureModuleLoadedOnce(parentModule, 'CoreModule')
    }
}
