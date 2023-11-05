import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { NgxChartsModule } from '@swimlane/ngx-charts'

import { ColorAgeChartsComponent } from './components/color-age-charts/color-age-charts.component'
import { EngineTypeChartsComponent } from './components/engine-type-charts/engine-type-charts.component'
import { HobbiesChartsComponent } from './components/hobbies-charts/hobbies-charts.component'
import { DashboardComponent } from './dashboard.component'

@NgModule({
    declarations: [
        DashboardComponent,
        ColorAgeChartsComponent,
        EngineTypeChartsComponent,
        HobbiesChartsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: DashboardComponent }]),

        NgxChartsModule,
        MatCardModule,
    ],
})
export class DashboardModule {}
