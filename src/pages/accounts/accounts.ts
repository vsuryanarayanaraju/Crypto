import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CoinmarketProvider} from '../../providers/coinmarket/coinmarket'
import {Chart} from 'chart.js';
import {HTTP} from "@ionic-native/http";
import {JitCompiler} from "@angular/compiler";


/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {
  public data: any;
  lineChart: any;
  exchange: any;
  coinname: any;
  time: any;
  _exe: any = [];
  switchcase: any = "Details";
  Works: any = [];
  public param_symbol: any;
  public param_name: any;
  public param_24: any;
  public Response: any;
  public exchangeData: any = {};
  coinprice:any;
  coinabov:any;
  coinabove:any;
  coinbelow:any;

  constructor(public navCtrl: NavController, public http: HTTP, public navParams: NavParams) {

    this.param_symbol = this.navParams.get('symbol');
    this.param_name = this.navParams.get('name');


    this.fetchtim();
    this.fetchexchange();
  }

  /* fetchCoinsList() {
     this.http.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + this.param_symbol + '&tsym=BTC&limit=14&aggregate=2&extraParams='+this.param_name, {}, {}).then(data => {
     console.log(JSON.parse(data.data));
     let pricehistory = JSON.parse(data.data);
     })
       .catch(error => {
         // error message as string
       });
   }*/

  fetchtim() {
    const that = this;

    this.http.get('https://min-api.cryptocompare.com/data/histohour?fsym=' + this.param_symbol + '&tsym=BTC&limit=12&aggregate=2&extraParams=' + this.param_name, {}, {}).then((res: any) => {
      let resp = JSON.parse(res.data);
      that.Response = resp.Data;
      that.fetchtime();
    });


  }


  fetchtime() {
    const that = this;
    const _pricedObj = [];
    const _data = [];
    this.Response.forEach(function (a, i) {
      that.http.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + that.param_symbol + '&tsyms=BTC&ts=' + a.time + '&extraParams=' + that.param_name, {}, {})
        .then(resp => {
          const obj = {
            time: a.time,
            price: JSON.parse(resp.data)[that.param_symbol]['BTC']
          };
          _pricedObj.push(obj);
          console.log(i, that.Response);
          if ((that.Response.length == _pricedObj.length)) {
            that.getgraph(_pricedObj);
          }

        })

    });
  }

  getgraph(object) {
    object.sort(function (a, b) {
      return (a.time < b.time) ? -1 : 1;
    });

    const _price = [];
    const _time = [];
    const _hours = [];

    object.forEach(function (item) {
      _price.push(item.price);
      _time.push(item.time);
      let hour = new Date(item.time * 1000);
      _hours.push(hour.getHours() + ':' + hour.getMinutes());
    });


    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: _hours,
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: _price,
        }]
      },


    })
  }

  fetchexchange() {
    const that = this;
    this.http.get('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=' + this.param_symbol + '&tsym=BTC&limit=10', {}, {}).then((res) => {
      let _exchange = JSON.parse(res.data);
      console.log(_exchange);
      that._exe = _exchange.Data;
      that.exchange = that._exe.Exchanges;
      that.exchangeData = that.exchange[0];
      that.coinprice = that.exchange[0].PRICE;
      this.Works = ["1H", "1D", "1M"];
    })

  }

  changeExchange(data) {
    console.log(data);
    this.exchangeData = data;
    this.coinprice = data.PRICE;
    this.coinabov = (this.coinprice * 100000000);
    this.coinabove = (this.coinabov + 1) / 100000000;
    this.coinbelow = (this.coinabov - 1) / 100000000;
  }

  onFocus(e, coinabove) {
    console.log(e);
    e.target.value = coinabove;
  }

  focusin(e, coinbelow) {
    console.log(e);
    e.target.value = coinbelow;
  }


}
