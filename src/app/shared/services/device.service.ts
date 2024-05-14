import { DOCUMENT } from '@angular/common';
import { Injectable, Renderer2, inject, RendererFactory2, Inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subscription, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private render: Renderer2;
  private renderFactory = inject(RendererFactory2);
  private $subscription: Subscription;

  _isMobile = signal<boolean>(false);


  isMobile = computed<boolean>(() => {
    return this._isMobile();
  });

  private static readonly BREAK_POINT_MOBILE: number = 768;

  constructor(@Inject(DOCUMENT) private document:Document) {
    this.render = this.renderFactory.createRenderer(null,null);
    this.$subscription = this.createWindowWidthObservable().subscribe((size=>{
      if(size <= DeviceService.BREAK_POINT_MOBILE){
        this.render.removeClass(this.document.body,'platform-core');
        this.render.addClass(this.document.body,'platform-mobile');
        this._isMobile.set(true);
      }else{
        this.render.removeClass(this.document.body,'platform-mobile');
        this.render.addClass(this.document.body,'platform-core');
        this._isMobile.set(false);
      }
    }));
  }

  private createWindowWidthObservable(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );
  }

  removeListener(){
    if(this.$subscription){
      this.$subscription.unsubscribe();
    }
  }

}
