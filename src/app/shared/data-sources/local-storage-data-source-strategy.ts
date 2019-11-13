import { BaseDataSourceStrategy } from './base-data-source-strategy';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageDataSourceStrategy extends BaseDataSourceStrategy {
    storeItem<T>(dataSourceName: string, item: T): Observable<void> {
        return this.getAll<T>(dataSourceName)
            .pipe(
                take(1),
                map((collection: T[]) => {
                    collection.push(item);
                    localStorage.setItem(dataSourceName, JSON.stringify(collection));
                    return;
                })
            );
    }

    getAll<T>(dataSource: string): Observable<T[]> {
        const collection = JSON.parse(localStorage.getItem(dataSource) || '[]') as T[];
        const subject = new ReplaySubject<T[]>(1);
        subject.next(collection);
        return subject.asObservable();
    }
}
