import { Component, OnInit } from '@angular/core'
import {
    AbstractControl,
    UntypedFormArray,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms'
import { LocationService } from '@core/services/location-service/location.service'
import { DataService } from '@core/services/data-service/data.service'
import { CountService } from '@core/services/count-service/count.service'

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private dataService: DataService,
        private locationService: LocationService,
        private countService: CountService
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
        firstName: [
            '',
            Validators.compose([Validators.required, Validators.minLength(2)]),
        ],
        lastName: [
            '',
            Validators.compose([Validators.required, Validators.minLength(2)]),
        ],
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
        city: [
            '',
            Validators.compose([Validators.required, Validators.minLength(2)]),
        ],
        country: [
            '',
            Validators.compose([Validators.required, Validators.minLength(2)]),
        ],
        address: [
            '',
            Validators.compose([Validators.required, Validators.minLength(2)]),
        ],
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

    ngOnInit(): void {
        this.countService.incrementCount()
    }

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

    private checkValidations() {
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
        } catch {}
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
        this.countService.incrementCount()
    }

    public async onGetLocation() {
        try {
            const location = await this.locationService.getLocation()
            this.personalInformationFormGroup
                .get('city')
                ?.setValue(location.LocalizedName)
            this.personalInformationFormGroup
                .get('country')
                ?.setValue(location.Country.LocalizedName)
        } catch {}
    }

    get hobbies() {
        return this.hobbiesFormGroup.get('hobbies')?.value || []
    }

    get color() {
        return this.carPreferenceFormGroup.get('color')?.value || '#000000'
    }
}
