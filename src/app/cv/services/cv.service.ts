import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, finalize, from, map, of} from 'rxjs';
import { Cv } from '../interfaces/cv.interface';
import { SpinnerService } from '../../shared/services/spinner.service';
import { addDoc, collection, Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private path = 'cvs';

  private http = inject(HttpClient);
  private spinnerService = inject(SpinnerService);

  private firestore = inject(Firestore);
  private cvCollection = collection(this.firestore,this.path);


  constructor() {
  }

  getMyCv(): Observable<Cv>{
    this.spinnerService.showSpinner();
    return this.http.get<Cv>('assets/data/myCV.json').pipe(
      finalize(()=>this.spinnerService.closeSpinner())
    );
  }


  create(cv: Cv): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.spinnerService.showSpinner();
      addDoc(this.cvCollection, cv).then(response =>{
        const key = response.path.replace(this.path + '/','');
        resolve(key);
      }).finally(()=>{
        this.spinnerService.closeSpinner();
      })
    })

  }

  getCv(id: string): Observable<Cv | null> {
    this.spinnerService.showSpinner();
    return from(getDoc(doc(this.firestore,this.path, id))).pipe(
      map(response=> {return response.data() as Cv}),
      catchError(_=>{
        return of(null)
      }),
      finalize(()=>{
        this.spinnerService.closeSpinner();
      })
    )
  }
}
