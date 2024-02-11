import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Cv } from '../interfaces/cv.interface';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private http = inject(HttpClient);

  constructor() { }

  getMyCv(): Observable<Cv>{
    return this.http.get<Cv>('assets/data/myCV.json');
  }
}
