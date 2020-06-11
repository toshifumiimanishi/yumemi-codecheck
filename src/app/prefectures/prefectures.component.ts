import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { PrefecturesService } from './prefectures.service';

@Component({
  selector: 'prefecture',
  templateUrl: './prefectures.component.html',
  styleUrls: ['./prefectures.component.scss']
})
export class PrefecturesComponent implements OnInit {
  prefectures;

  @Output() checked = new EventEmitter

  constructor(private prefecturesService: PrefecturesService) {}

  async ngOnInit() {
    this.prefectures = await this.prefecturesService.fetchPrefectures();
  }

  onCheckedPrefName(event) {
    const prefName = event.currentTarget.name;
    const prefCode = event.currentTarget.value;
    const isChecked = event.currentTarget.checked;

    if (isChecked) {
      this.checked.emit({ prefName, prefCode });
    }
  }
}
