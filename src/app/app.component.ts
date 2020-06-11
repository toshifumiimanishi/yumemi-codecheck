import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  totalPopulation = [];

  constructor(private appService: AppService) {}

  async onChecked({ prefName, prefCode }) {
    const result = await this.appService.fetchPopulationComposition({ prefName, prefCode })
    const totalPopulation = result.data[0];

    this.totalPopulation = [...this.totalPopulation, {
      prefName,
      prefCode,
      data: totalPopulation.data
    }];
  }
}
