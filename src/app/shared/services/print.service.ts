import { HostListener, Injectable, computed, signal } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintService {


  private $beforePrint!: Subscription;
  private $afterPrint!: Subscription;

  private readonly _isPrint = signal<boolean>(false);

  public isPrint = computed(()=>this._isPrint());

  constructor () {
    this.configEvents();
  }

  configEvents(){

    this.$afterPrint = fromEvent(window,'afterprint').subscribe((_)=>{
      this._isPrint.set(false);
    });

    this.$beforePrint = fromEvent(window,'beforeprint').subscribe((_)=>{
      this._isPrint.set(true);
    });

  }

  setPrint(){
    this._isPrint.set(true);
  }

  stopListenners() {
    this._isPrint.set(false);
    this.$afterPrint?.unsubscribe();
    this.$beforePrint?.unsubscribe();
  }

}
