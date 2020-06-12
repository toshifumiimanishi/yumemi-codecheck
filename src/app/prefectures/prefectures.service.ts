import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PrefecturesService {
  constructor(private http: HttpClient) {}

  async fetchPrefectures() {
    const { result }: any = await this.http
      .get(
        `${environment.apiUrl}/prefectures`,
        {
          headers: new HttpHeaders({
            'X-API-KEY': environment.apiKey,
          }),
        }
      )
      .toPromise()

    return result;
  }
}
