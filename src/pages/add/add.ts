import {Component} from "@angular/core";
import {IonicPage, NavController, LoadingController, NavParams} from "ionic-angular";
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";
import {PricesPage} from "../prices/prices";
import {TabsPage} from "../tabs/tabs";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  public coins: any = [];
  private items: any = [];
  private searchItems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public coinmarket: CoinmarketProvider, private Loading: LoadingProvider) {
    this.Loading.show('Getting latest entries...');
    this.getdetail();
  }

  ionViewDidEnter() {

  }

  getdetail() {
    this.coins = this.coinmarket.bindImageUrl();
    this.initializeItems();
    this.Loading.hide();
  }


  addCoin(obj) {
    this.coinmarket.setCoin(obj);
    this.navCtrl.push(PricesPage);
  }

  initializeItems() {
    this.items = this.coins;

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  goBack() {
    this.navCtrl.pop()
  }
}
