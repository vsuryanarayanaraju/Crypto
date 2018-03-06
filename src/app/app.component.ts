import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {CoinmarketProvider} from "../providers/coinmarket/coinmarket";
import {PricesPage} from "../pages/prices/prices";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private CoinMarket: CoinmarketProvider) {
    const that = this;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.getImageUrls();

      setInterval(function () {
        that.fetchCoins();
      },10000);
    });

  }

  getImageUrls(){
    const that = this;
    this.CoinMarket.fetchImageUrls().then(function (resp) {
      that.fetchCoins();
    },function (error) {
      console.log('Error in getting image urls');
    })
  }

  fetchCoins(){
    const that= this;
    this.CoinMarket.fetchCoinsList().then(function (resp) {
      that.checkHistory();
    },function (error) {
      console.log('Fetch error' , new Date().getTime())
    })
  }

  checkHistory(){
    if(!localStorage.getItem('history')){
      localStorage.setItem('history',JSON.stringify(this.CoinMarket.bindImageUrl().splice(4,4)))
    }
    this.rootPage = PricesPage;
  }

}
