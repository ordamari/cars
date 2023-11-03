import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingPageComponent } from './landing-page.component'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper'
import { MatListModule } from '@angular/material/list'
@NgModule({
    declarations: [LandingPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: LandingPageComponent }]),
        FormsModule,
        ReactiveFormsModule,

        MatNativeDateModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatIconModule,
        MatStepperModule,
        MatListModule,
    ],
})
export class LandingPageModule {}
