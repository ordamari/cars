import { Injectable } from '@angular/core'
import { initialData } from '@assets/data/initial-data'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CountService {
    readonly LOCAL_STORAGE_KEY = 'COUNT_OR_DAMARI'
    private count = this.getInitialCount()
    private countSubject = new BehaviorSubject<number>(this.count)
    public $count: Observable<number> = this.countSubject.asObservable()

    private getInitialCount(): number {
        try {
            let dataString = localStorage.getItem(this.LOCAL_STORAGE_KEY)
            if (!dataString) throw new Error('No data in local storage')
            const storageCount = +dataString
            if (isNaN(storageCount)) throw new Error('Invalid number')
            return storageCount
        } catch {
            return initialData.length + 5
        }
    }

    private saveCount(count: number): void {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, count.toString())
        this.countSubject.next(count)
    }

    public incrementCount(): void {
        this.count++
        this.saveCount(this.count)
    }

    constructor() {}
}
