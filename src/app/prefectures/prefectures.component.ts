import { Component, OnInit } from '@angular/core';

import { PrefecturesService } from './prefectures.service';

@Component({
  selector: 'prefecture',
  templateUrl: './prefectures.component.html',
  styleUrls: ['./prefectures.component.scss']
})
export class PrefecturesComponent implements OnInit {
  prefectures;

  constructor(private prefecturesService: PrefecturesService) {}

  async ngOnInit() {
    this.prefectures = await this.prefecturesService.fetchPrefectures();
  }
}
