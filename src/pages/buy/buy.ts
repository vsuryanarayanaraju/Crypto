import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";
import {NewsPage} from "../news/news"
/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  public coins: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public coinmarket: CoinmarketProvider) {
    const that = this;
    this.coins = this.coinmarket.getCoinsList();
  }


}
