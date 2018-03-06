import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HTTP } from '@ionic-native/http';
import {AlertPage} from '../pages/alert/alert'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CoinmarketProvider } from '../providers/coinmarket/coinmarket';
import {BuyPage} from "../pages/buy/buy";
import {SettingsPage} from "../pages/settings/settings";
import { LocalNotifications } from '@ionic-native/local-notifications';
import {AccountsPage} from "../pages/accounts/accounts";
import {PricesPage} from "../pages/prices/prices";
import {NewsPage} from "../pages/news/news";
import {AddPage} from "../pages/add/add";
import {BitPage} from "../pages/bit/bit";
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {PopoverPage} from "../pages/popover/popover";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { LoadingProvider } from '../providers/loading/loading';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BuyPage,
    SettingsPage,
    AccountsPage,
    PricesPage,
    NewsPage,
    AlertPage,
    AddPage,
    BitPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    IonicSwipeAllModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BuyPage,
    SettingsPage,
    AccountsPage,
    PricesPage,
    NewsPage,
    AddPage,
    AlertPage,
    BitPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CoinmarketProvider,
    HTTP,
    Screenshot,
    NativePageTransitions,
    InAppBrowser,
  SocialSharing,
    LoadingProvider,
    LoadingProvider
  ]
})
export class AppModule {}
