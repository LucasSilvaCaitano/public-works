import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/Storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PostProvider } from './provider/post-provider';
import { Camera } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { ModalpreviewfotoPageModule } from './modalpreviewfoto/modalpreviewfoto.module';
 
import { ModalfotoobraPageModule } from './modalfotoobra/modalfotoobra.module';

import {ModalFotoDenunciaPageModule} from './modal-foto-denuncia/modal-foto-denuncia.module';

import { OCR } from '@ionic-native/ocr/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FCM } from '@ionic-native/fcm/ngx';
import { from } from 'rxjs';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      HttpModule,
      ModalpreviewfotoPageModule,
      ModalfotoobraPageModule,
      ModalFotoDenunciaPageModule,
      HttpClientModule
      ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    PostProvider,
    Camera,
    File,
    WebView,
    OCR,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
