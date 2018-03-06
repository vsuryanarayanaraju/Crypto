import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";
import {HTTP} from "@ionic-native/http";
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import {SettingsPage} from "../settings/settings";
import {PricesPage} from "../prices/prices";
import {AlertPage} from "../alert/alert";
import {AddPage} from "../add/add";
import {LoadingProvider} from "../../providers/loading/loading";
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public news: any = [];
  public newss: any = {};
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
  };
  option: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 3,
    slidePixels: 20,
    iosdelay: 100,
    androiddelay: 150,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
  };
  homeOptions: any = {
    initialSlide: 1,
  };

  constructor(public navCtrl: NavController,private Loading: LoadingProvider, private iab: InAppBrowser, public http: HTTP, public navParams: NavParams,
              private nativePageTransitions: NativePageTransitions, public coinmarket: CoinmarketProvider) {
    const that = this;
    this.Loading.show('Getting latest entries...');
    this.http.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=f03e2f142f9340e1bef6ad3ce586988a', {}, {}).then(data => {
      console.log(data.status);
      this.news = (JSON.parse(data.data)).articles;
      that.Loading.hide();
      console.log(this.news);// data received by server
      console.log(data.headers);
    });

  }

  /* swipeAll(event: any,news): any {
     if(event.direction === 2) {
       this.iab.create(news.url,'_blank', this.options)
     }
     if(event.direction === 4) {
       this.navCtrl.push(SettingsPage);
     }
     if(event.direction === 3) {
      this.navCtrl.push(PricesPage);
     }
     if(event.direction === 1) {
       this.navCtrl.push(AddPage);
     }
   }*/

 /* getnews() {
    this.nativePageTransitions.slide(this.option);
    this.navCtrl.push(SettingsPage);
  }*/

  swipeLeft(event: any, news): any {
    console.log('Swipe Left', event);
    this.iab.create(news.url, '_blank', this.options)
  }

  swipeRight(event: any, news): any {
    console.log('Swipe Right', event);
    this.navCtrl.push(SettingsPage);

  }



  /* swipeUp(event: any,newss): any {
    console.log('Swipe Up', event);
    this.newss = this.news[1];
    this.newss = this.news.map(function(val){return ++val;});
    console.log(this.newss);

     return this.newss

  }

  swipeDown(event: any,newss): any {
    console.log('Swipe Down', event);
    this.navCtrl.push(AddPage);
  }
  swipeEvent(e,news) {
    console.log(e);
    if(e.direction === 2) {
      this.iab.create(news.url,'_blank', this.options)
    }
    if(e.direction === 4) {
    this.navCtrl.push(SettingsPage);
    }
    if(e.direction === 1){
      this.iab.create(news.url,'_self', this.options)
    }
    if(e.direction === 3){
      this.iab.create(news.url,'_system', this.options)
    }
  }
  slideChanged(ev,newss) {
    console.log(ev);
    if(ev._direction === "horizontal") {
      if (ev._activeIndex === 2) {
        this.iab.create(newss.url, '_blank', this.options);
      }
      if (ev._activeIndex === 0) {
        this.navCtrl.push(SettingsPage);
      }
    }
    if(ev._direction === "vertical") {
      if (ev._activeIndex === 2) {
        this.iab.create(newss.url, '_blank', this.options);
      }
      if (ev._activeIndex === 0) {
        this.navCtrl.push(SettingsPage);
      }
    }
    }*/


  }

