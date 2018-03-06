import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import {Screenshot} from '@ionic-native/screenshot';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {SocialSharing} from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  constructor(private view: ViewController, public navCtrl: NavController, private screenshot: Screenshot, private socialSharing: SocialSharing, public navParams: NavParams, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  cabbook() {
    this.navCtrl.push(SettingsPage);
  }

  dismissView(type) {
    const that = this;
    this.view.dismiss().then(function () {
      if (type == 'cab') {
        that.cabbook();
      } else if (type == 'screen') {
        that.Sharescreen();
      }
    });
  }

  Sharescreen() {
    const that = this;
    this.screenshot.URI(80).then((data) => {
      console.log(data.URI);
      that.socialSharing.share("Screen shot", "", data.URI).then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
        console.error("shareSheetShare: failed");
      });
    })
  }

}
