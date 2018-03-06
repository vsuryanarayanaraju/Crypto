import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Chart} from 'Chart.js';
import {HTTP} from "@ionic-native/http";
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";
/**
 * Generated class for the BitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bit',
  templateUrl: 'bit.html',
})
export class BitPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  lineChart: any;

  public coinname: any;
  public history: any = [];
  public time: any = [];

  constructor(public navCtrl: NavController, private CoinMarket: CoinmarketProvider, public http: HTTP, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BitPage');
    this.coinname = this.navParams.get('id');
    this.gethistory();

  }
  chart(){
  this.barChart = new Chart(this.barCanvas.nativeElement, {

    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: this.time,
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
  }
  gethistory() {
    const that = this;
    this.http.get('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=60&aggregate=3&e=Kraken&extraParams=coinname', {}, {}).then(data => {
      this.history = (JSON.parse(data.data)).Data;
      this.time = [];
      this.history.forEach(function (item) {
        that.time.push(item.time);
      });
    });
    this.getprice();
    this.chart();
  }

  getprice(){
   this.time.forEach(function(item){
    })
  }

  goBack() {
    this.navCtrl.pop();
  }

}
