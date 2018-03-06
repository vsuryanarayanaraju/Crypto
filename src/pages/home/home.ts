import { Component,OnInit } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {CoinmarketProvider} from "../../providers/coinmarket/coinmarket";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  public data: any = [];
  public datj;
  datak: any;
  dataj: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public coinmarket: CoinmarketProvider) {
    //this.data = this.coinmarket.paramData;
    //this.datak = this.data[0].name;
    //this.datj = this.coinmarket.paramData;
    //this.dataj = this.dataj.push(this.datj);

  }

}
