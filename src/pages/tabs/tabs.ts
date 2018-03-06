import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {PricesPage} from "../prices/prices";
import {AccountsPage} from "../accounts/accounts";
import {BuyPage} from "../buy/buy";
import {NewsPage} from "../news/news";
import {SettingsPage} from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PricesPage;
 /* tab2Root = AccountsPage;
  tab3Root = BuyPage;
  tab4Root = NewsPage;
  tab5Root = SettingsPage;*/

  constructor() {

  }
}
