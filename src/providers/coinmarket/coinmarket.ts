import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {HTTP} from "@ionic-native/http";
import {Subject} from "rxjs/Subject";
import "rxjs/operator/catch";
/*
 Generated class for the CoinmarketProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */


@Injectable()
export class CoinmarketProvider {
  public CoinsSubject = new Subject();
  public datalog: any;
  public para: any;
  public LiveCoins: any = {};
  public CoinsList = [];
  public CoinImages:any;

  constructor(public http: HTTP) {

  }

  fetchCoinsList() {
    return new Promise((resolve, reject) => {
      this.http.get('https://api.coinmarketcap.com/v1/ticker/?convert=CAD', {}, {}).then(data => {
        this.LiveCoins = this.filterCoins(JSON.parse(data.data));
        this.CoinsList = JSON.parse(data.data);
        resolve(this.CoinsList);
      })
        .catch(error => {
          this.CoinsList = [];
          reject(error.error); // error message as string
        });
    })
  }

  getCoinsList(){
    return this.CoinsList;
  }

  getImageUrl(){
    return this.CoinImages;
  }

  fetchImageUrls() {
    return new Promise((resolve, reject) => {
      this.http.get('https://www.cryptocompare.com/api/data/coinlist/', {}, {}).then(data => {
        this.CoinImages = JSON.parse(data.data);
        resolve(JSON.parse(data.data))
      })
        .catch(error => {
          reject(error.error); // error message as string
        });
    })
  }

  setCoin(coin) {
    this.CoinsSubject.next(coin);
  }

  getCoin() {
    return this.CoinsSubject.asObservable();
  }

  filterCoins(data) {
    const that = this;
    data.forEach(function (item) {
      that.LiveCoins[item.symbol] = item;
    });
    return this.LiveCoins;
  }

  getLiveCoins(){
    return this.LiveCoins;
  }

  bindImageUrl(){
    const that = this;
    this.CoinsList.forEach(function (a) {
      if (that.CoinImages.Data[a.symbol]) {
        a.coinname = that.CoinImages.Data[a.symbol].CoinName;
        a.imageurl = that.CoinImages.BaseImageUrl + that.CoinImages.Data[a.symbol].ImageUrl;
      }
    });
    return this.CoinsList;

  }
}
