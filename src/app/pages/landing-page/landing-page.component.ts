import { Component } from '@angular/core'
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms'

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
    constructor(private _formBuilder: FormBuilder) {}
    readonly genders: string[] = ['Male', 'Female', 'Other']
    readonly motorTypes: string[] = ['Gasoline', 'Diesel', 'Electric', 'Hybrid']

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
        dateOfBirth: ['', Validators.required],
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
        color: ['', this.isColor()],
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
        const hobbiesArray = this.hobbiesFormGroup.get('hobbies') as FormArray
        hobbiesArray.push(this._formBuilder.control(newHobby))
        this.hobbiesFormGroup.get('newHobby')?.setValue('') // Reset the newHobby control
    }

    public onDeleteHobby(index: number) {
        const hobbiesArray = this.hobbiesFormGroup.get('hobbies') as FormArray
        hobbiesArray.removeAt(index)
    }

    get hobbies() {
        return this.hobbiesFormGroup.get('hobbies')?.value || []
    }
}
