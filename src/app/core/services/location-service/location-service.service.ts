import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ZodUtils } from '../../utils/zod.utils'
import { Location, locationSchema } from 'src/app/shared/models/location.model'
import { environment } from '@env/environment'

@Injectable({
    providedIn: 'root',
})
export class LocationServiceService {
    private BASE_URL = 'https://dataservice.accuweather.com/'
    constructor(private http: HttpClient, private zodUtils: ZodUtils) {}

    private getLocationCoords(): Promise<GeolocationPosition['coords']> {
        if (!navigator.geolocation)
            throw new Error('Geolocation is not supported by your browser')
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position.coords)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    private async getLocationByGeolocation(lat: number, lon: number) {
        const $res = this.http
            .get<Location>(
                `${this.BASE_URL}locations/v1/cities/geoposition/search`,
                {
                    params: {
                        apikey: environment.WEATHER_API_KEY,
                        q: `${lat},${lon}`,
                    },
                }
            )
            .pipe(this.zodUtils.parseResponse(locationSchema))
        return $res
    }

    public async getLocation() {
        const coords = await this.getLocationCoords()
        return this.getLocationByGeolocation(coords.latitude, coords.longitude)
    }
}
