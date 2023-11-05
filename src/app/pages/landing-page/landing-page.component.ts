import { Component } from '@angular/core'
import {
    AbstractControl,
    UntypedFormArray,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms'
import { DataService } from 'src/app/core/services/data-service/data.service'

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private dataService: DataService
    ) {}
    readonly genders: string[] = ['Male', 'Female', 'Other']
    readonly motorTypes: string[] = ['Gasoline', 'Diesel', 'Electric', 'Hybrid']
    isSended = false

    private minLengthArray(min: number) {
        return (c: AbstractControl): { [key: string]: any } | null => {
            if (c.value.length >= min) return null

            return { MinLengthArray: true }
        }
    }

    private optionOfList(list: string[]) {
        return (c: AbstractControl): { [key: string]: any } | null => {
            if (list.some((item) => item === c.value)) return null
            return { NotAnOption: true }
        }
    }

    private isColor() {
        return (c: AbstractControl): { [key: string]: any } | null => {
            const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/
            if (hexColorRegex.test(c.value)) return null
            return { NotAColor: true }
        }
    }

    personalInformationFormGroup = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: [
            '',
            Validators.compose([
                Validators.required,
                this.optionOfList(this.genders),
            ]),
        ],
        dateOfBirth: [new Date(), Validators.required],
        email: [
            '',
            Validators.compose([Validators.required, Validators.email]),
        ],
        city: ['', Validators.required],
        country: ['', Validators.required],
        address: ['', Validators.required],
    })

    hobbiesFormGroup = this._formBuilder.group({
        hobbies: this._formBuilder.array([], this.minLengthArray(1)),
        newHobby: [''],
    })

    carPreferenceFormGroup = this._formBuilder.group({
        color: ['#000000', this.isColor()],
        seats: [
            2,
            Validators.compose([
                Validators.required,
                Validators.min(2),
                Validators.max(7),
            ]),
        ],
        motorType: ['', this.optionOfList(this.motorTypes)],
    })

    public onAddHobby() {
        const newHobby = this.hobbiesFormGroup.get('newHobby')?.value as string
        if (!newHobby) return
        const hobbiesArray = this.hobbiesFormGroup.get(
            'hobbies'
        ) as UntypedFormArray
        hobbiesArray.push(this._formBuilder.control(newHobby))
        this.hobbiesFormGroup.get('newHobby')?.setValue('') // Reset the newHobby control
    }

    public onDeleteHobby(index: number) {
        const hobbiesArray = this.hobbiesFormGroup.get(
            'hobbies'
        ) as UntypedFormArray
        hobbiesArray.removeAt(index)
    }

    public checkValidations() {
        return (
            this.personalInformationFormGroup.valid &&
            this.hobbiesFormGroup.valid &&
            this.carPreferenceFormGroup.valid
        )
    }

    public onSubmit() {
        try {
            if (!this.checkValidations()) throw new Error('Invalid form')
            const data = {
                ...this.personalInformationFormGroup.value,
                ...this.carPreferenceFormGroup.value,
                seats: +this.carPreferenceFormGroup.get('seats')?.value || 0,
                hobbies: this.hobbies,
            } as unknown
            this.dataService.addDataItem(data)
            this.isSended = true
        } catch {
            console.log('error')
        }
    }

    public onReset() {
        this.personalInformationFormGroup.reset({ dateOfBirth: new Date() })
        this.hobbiesFormGroup.reset()
        this.hobbiesFormGroup.reset({
            hobbies: [],
            newHobby: '',
        })
        this.carPreferenceFormGroup.reset({
            color: '#000000',
            seats: 2,
            motorType: '',
        })
        this.isSended = false
        const hobbiesArray = this.hobbiesFormGroup.get(
            'hobbies'
        ) as UntypedFormArray
        hobbiesArray.clear()
    }

    get hobbies() {
        return this.hobbiesFormGroup.get('hobbies')?.value || []
    }

    get color() {
        return this.carPreferenceFormGroup.get('color')?.value || '#000000'
    }
}
