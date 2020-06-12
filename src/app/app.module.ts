import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrefecturesModule } from './prefectures/prefectures.module';
import { ChartModule } from './chart/chart.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PrefecturesModule,
    ChartModule,
    HttpClientModule,
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
