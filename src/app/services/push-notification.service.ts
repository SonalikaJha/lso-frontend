import { SwUpdate, SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { Injectable } from '@angular/core';
import Config from '../../assets/js/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
    private apiService: ApiCallService,
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private swPush: SwPush
  ) { }

  initiate() {

    // check for update
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.available.subscribe(event => {
      
        this.updateToLatest();
      });
    }

    // subscribe
    if (this.swPush.isEnabled && !localStorage.getItem('subscription')) {
      this.swPush.requestSubscription({
        serverPublicKey: 'BJqLzyUtrZMdAVqzReJhlqRvgRdQfYlvlRukZ210GgrTa9w1zrOwMp0Eis-crbmucOaxfBPi10mg5ieIKq5Yyn8'
      }).then(subscription => {
        localStorage.setItem('subscription', JSON.stringify(subscription));
        return this.subscribe(subscription).subscribe(result => {
         
        }, err => {
          
        });
      });
    }
  }

  updateToLatest(): void {
   
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  subscribe(subscription) {
    return this.http.post(Config.baseUrl + Config.url.subscribe, subscription, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(Config.localStorageKeys.userData)).token
      }
    });
    // const request = {
    //   apiEndPoint: Config.url.subscribe,
    //   method: 'POST',
    //   Authorization: true,
    //   data: subscription
    // };
    // return this.apiService.hitApi(request);
  }
}
