import { Injectable } from '@angular/core'
import { Data, dataItemsSchema, dataSchema } from '@shared/models/data.model'
import { BehaviorSubject, Observable } from 'rxjs'
import { initialData } from '@assets/data/initial-data'

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() {}
    private readonly LOCAL_STORAGE_KEY = 'DATA_ITEMS_OR_DAMARI'
    private dataItems: Data[] = this.getInitialDataItems()
    private dataItemsSubject = new BehaviorSubject<Data[]>(this.dataItems)
    public $dataItems: Observable<Data[]> = this.dataItemsSubject.asObservable()

    private getInitialDataItems(): Data[] {
        try {
            let dataString = localStorage.getItem(this.LOCAL_STORAGE_KEY)
            if (!dataString) throw new Error('No data in local storage')
            const dataItems = JSON.parse(dataString)
            if (dataItems && Array.isArray(dataItems)) {
                dataItems.forEach((dataItem) => {
                    if (dataItem && dataItem?.dateOfBirth) {
                        dataItem.dateOfBirth = new Date(dataItem.dateOfBirth)
                    }
                })
            }
            const parsed = dataItemsSchema.safeParse(dataItems)
            if (!parsed.success) throw new Error('Invalid data items')

            return parsed.data
        } catch {
            return [...initialData] as Data[]
        }
    }

    private saveDataItems(dataItems: Data[]): void {
        this.dataItemsSubject.next(dataItems)
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(dataItems))
    }

    public addDataItem(dataItem: unknown): void {
        const parsed = dataSchema.safeParse(dataItem)
        if (!parsed.success) throw new Error('Invalid data item')
        this.dataItems.push(parsed.data)
        this.saveDataItems(this.dataItems)
    }
}
