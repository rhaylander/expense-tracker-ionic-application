import { Observable } from 'rxjs';

export abstract class BaseDataSourceStrategy {
    abstract storeItem<T>(dataSourceName: string, item: T): Observable<void>;
    abstract getAll<T>(dataSource: string): Observable<T[]>;
}
