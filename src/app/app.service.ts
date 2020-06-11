import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  async fetchPopulationComposition({ prefName, prefCode }) {
    const { result }: any = await this.http.get(`${environment.apiUrl}/population/composition/perYear?prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': environment.apiKey,
      },
    })
    .toPromise()

    return result
  }
}
