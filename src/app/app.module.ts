import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { OnsenModule } from 'ngx-onsenui';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDataSourceStrategy } from './shared/data-sources/base-data-source-strategy';
import { LocalStorageDataSourceStrategy } from './shared/data-sources/local-storage-data-source-strategy';
import { DescriptiveStatementComponent } from './descriptive-statement/descriptive-statement.component';
import { RegisterTransactionComponent } from './register-transaction/register-transaction.component';

@NgModule({
    declarations: [
        AppComponent,
        DescriptiveStatementComponent,
        RegisterTransactionComponent,
    ],
    entryComponents: [
        DescriptiveStatementComponent,
        RegisterTransactionComponent,
    ],
    imports: [
        BrowserModule,
        OnsenModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        // AppRoutingModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: BaseDataSourceStrategy, useExisting: LocalStorageDataSourceStrategy },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
