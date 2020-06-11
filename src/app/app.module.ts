import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrefecturesModule } from './prefectures/prefectures.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PrefecturesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
