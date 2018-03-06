import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage implements  OnInit{
public data:any=[];
  constructor(private navParams:NavParams,public navCtrl: NavController) {

  }
ngOnInit(){
    this.data =this.navParams.get('obj');
}
}
