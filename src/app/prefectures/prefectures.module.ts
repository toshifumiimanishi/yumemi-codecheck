import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PrefecturesComponent } from './prefectures.component';
import { PrefecturesService } from './prefectures.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    PrefecturesComponent
  ],
  providers: [
    PrefecturesService
  ],
  exports: [
    PrefecturesComponent
  ]
})
export class PrefecturesModule {}
