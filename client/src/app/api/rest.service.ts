import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class RestService {
  constructor(private http: HttpClient) { }

  /**
   * Standard GET query.
   * @param url The URL.
   * @param options Optional options given to httpClient.
   */
  get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  /**
   * Standard POST query.
   * @param url The URL.
   * @param body The query body
   * @param options Optional options given to httpClient.
   */
  post(url: string, body?: any, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }
}
