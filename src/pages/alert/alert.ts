import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from "ionic-angular";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";
import {HTTP} from '@ionic-native/http';

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {
  public coinprice: any;
  public coin: any = [];
  public coinabove: any;
  public exchanges: any;
  public param_symbol: any;
  public coinabov: any;
  public coinbelow: any;

  constructor(public navCtrl: NavController, private http: HTTP, private localNotifications: LocalNotifications, private CoinMarket: CoinmarketProvider, public alertCtrl: AlertController, public navParams: NavParams) {
    this.param_symbol = this.navParams.get('symbol');

    const that = this;
    setInterval(function () {
      that.updatePrice()
    }, 1000);
    setInterval(function () {
      that.updatePric()
    }, 10000);
    this.getexchange();
  }

  ionViewDidLoad() {
  }

  updatePric() {
    this.coinprice = this.CoinMarket.getLiveCoins()[this.param_symbol].price_btc;
    this.getalert();
  }


  updatePrice() {
    this.coinprice = this.CoinMarket.getLiveCoins()[this.param_symbol].price_btc;
    this.coinabov = (this.coinprice * 100000000);
    this.coinabove = (this.coinabov + 1) / 100000000;
    this.coinbelow = (this.coinabov - 1) / 100000000;
  }

  getexchange() {
    this.http.get(  'https://www.cryptocompare.com/api/data/coinsnapshot/?fsym='+ this.param_symbol +'&tsym=CAD', {}, {}).then(exchange => {
      this.exchanges = JSON.parse(exchange.data).Data
    })
  }

  onFocus(e, coinabove) {
    console.log(e);
    e.target.value = coinabove;
  }

  focusin(e, coinbelow) {
    console.log(e);
    e.target.value = coinbelow;
  }


  getalert() {

    console.log(this.coinprice);

    if (this.coinprice > this.coinabove || this.coinprice < this.coinbelow) {
      this.getnotification();
    }

  }

  getnotification() {
    this.localNotifications.schedule({
      id:1,
      text: 'Estimation Reached'
    });
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Notification',
      message: "Do you like to get a notification before reaching your Estimation",

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.getalert();
          }
        }
      ]
    });
    prompt.present();
  }
  cancelAll(){

    this.localNotifications.cancelAll();

  }

}
