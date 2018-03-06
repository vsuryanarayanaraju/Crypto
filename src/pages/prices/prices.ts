import {Component, ViewChild} from "@angular/core";
import {IonicPage, ModalController, PopoverController, NavController, NavParams, ViewController} from "ionic-angular";
import {AddPage} from "../add/add";
import {BitPage} from "../bit/bit";
import {Chart} from "chart.js";
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";
import set = Reflect.set;
import {AlertPage} from "../alert/alert";
import {AlertController} from "ionic-angular";
import {NewsPage} from "../news/news";
import {AccountsPage} from "../accounts/accounts";
import {SettingsPage} from "../settings/settings";
import {PopoverPage} from "../popover/popover"
/**
 * Generated class for the PricesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prices',
  templateUrl: 'prices.html',
})
export class PricesPage {


  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  public Coins = [];

  barChart: any;
  lineChart: any;
  public data: any = [];
  public History: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public viewCtrl: ViewController, public alertcontroller: AlertController,  public popoverCtrl: PopoverController, private CoinMarket: CoinmarketProvider) {

    this.History = this.getHistory();
    const that = this;
    that.CoinMarket.getCoin().subscribe(function (resp: any) {
      that.History.unshift(resp);
      that.updatehistory();
    });
    setInterval(function () {
      that.updatePrice();
    }, 20000)
  }


  /*ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }

    });
  }*/

  graphalert(coin){
    this.navCtrl.push(AccountsPage,coin);
  }
  add() {
    let myModal = this.modalCtrl.create(AddPage);
    myModal.present();
  }

  bit() {
    let myModal = this.modalCtrl.create(BitPage);
    myModal.present()
  }

  updatehistory() {
    localStorage.setItem('history', JSON.stringify(this.History));
    this.Coins = JSON.parse(JSON.stringify(this.History));
    console.log(this.History);
  }

  item(coin) {
    this.navCtrl.push(BitPage, coin);
  }

  getHistory() {
    if (localStorage.getItem('history')) {
      this.Coins = JSON.parse(localStorage.getItem('history'));
      return JSON.parse(localStorage.getItem('history'));
    } else {
      return [];
    }
  }
settings(){
    this.navCtrl.push(SettingsPage);
}
  updatePrice() {
    const that = this;
    this.Coins.forEach(function (item) {
      item.price_usd = that.CoinMarket.getLiveCoins()[item.symbol].price_usd;
      item.price_btc = that.CoinMarket.getLiveCoins()[item.symbol].price_btc;
      item.percent_change_24h = that.CoinMarket.getLiveCoins()[item.symbol].percent_change_24h;
    })
  }

  alertco(coin) {
    this.navCtrl.push(AlertPage, coin);
    console.log(coin);

  }
newspage(){
    this.navCtrl.push(NewsPage);
}
  more(myEvent){
  let popover = this.popoverCtrl.create(PopoverPage);
  popover.present({
    ev: myEvent
  })
  }

}
