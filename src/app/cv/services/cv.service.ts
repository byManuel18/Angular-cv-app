import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, finalize} from 'rxjs';
import { Cv } from '../interfaces/cv.interface';
import { SpinnerService } from '../../shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private http = inject(HttpClient);
  private spinnerService = inject(SpinnerService);

  constructor() { }

  getMyCv(): Observable<Cv>{
    this.spinnerService.showSpinner();
    return this.http.get<Cv>('assets/data/myCV.json').pipe(
      finalize(()=>this.spinnerService.closeSpinner())
    );
  }
}
