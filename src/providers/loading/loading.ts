import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  public Loading:any;
  constructor(private loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  show(message){
    this.Loading = this.loadingCtrl.create({
      content: message
    });

    this.Loading.present();
  }

  hide(){
    this.Loading.dismiss();
  }

}
