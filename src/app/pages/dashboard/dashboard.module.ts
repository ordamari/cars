import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { RouterModule } from '@angular/router'
import { ColorAgeChartsComponent } from './components/color-age-charts/color-age-charts.component'

import { MatCardModule } from '@angular/material/card'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EngineTypeChartsComponent } from './components/engine-type-charts/engine-type-charts.component';
import { HobbiesChartsComponent } from './components/hobbies-charts/hobbies-charts.component'

@NgModule({
    declarations: [DashboardComponent, ColorAgeChartsComponent, EngineTypeChartsComponent, HobbiesChartsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: DashboardComponent }]),

        NgxChartsModule,
        MatCardModule,
    ],
})
export class DashboardModule {}
