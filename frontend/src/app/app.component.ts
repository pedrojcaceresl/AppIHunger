import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Pedidos', url: '/folder/Pedidos', icon: 'newspaper' },
    { title: 'Mi cuenta', url: '/folder/Mi cuenta', icon: 'person' },
    { title: 'Información legal', url: '/folder/Información Legal', icon: 'information-circle' },
    { title: 'Ayuda en línea', url: '/folder/Ayuda en Línea', icon: 'headset' },
    { title: 'Admin', url: '/admin', icon: 'people' },

    
   /*  { title: 'Spam', url: '/folder/Spam', icon: 'warning' }, */
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
   /*  private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar */
  ) {
   /*  this.initializeApp(); */
  }

 /*  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  } */
}
