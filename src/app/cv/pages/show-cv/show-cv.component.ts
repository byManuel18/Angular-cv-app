import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import 'ninja-keys';

import { Cv } from '../../interfaces/cv.interface';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'show-cv',
  templateUrl: './show-cv.component.html',
  styleUrl: './show-cv.component.css'
})
export class ShowCvComponent implements OnInit{

  activedRouter = inject(ActivatedRoute);

  private readonly _cvToShow = signal<Cv | null>(null) ;

  private cvService = inject(CvService);

  ngOnInit(): void {
    this.activedRouter.params
      .pipe(
        switchMap(params => this.getCv(params['jObj']))
      )
      .subscribe(result =>{
        this._cvToShow.set(result);
      })
  }

  getCv(param: string = ''): Observable<Cv | null>{

    if(param === 'myCV' ){
      return this.cvService.getMyCv();
    }

    try {
      const jObjString: string = decodeURIComponent(param);
      const cvJson: Cv = JSON.parse(jObjString);
      return of(cvJson);
    } catch (error) {
      return of(null);
    }

  }

}
