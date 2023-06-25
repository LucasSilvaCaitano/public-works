import { Component } from '@angular/core';
import { PostProvider } from '../provider/post-provider';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-finalizer',
  templateUrl: './finalizer.page.html',
  styleUrls: ['./finalizer.page.scss'],
})
export class FinalizerPage {
  obras = []
  constructor(private provider:PostProvider, private navCtrl:NavController, private geo : Geolocation) { }

  ionViewWillEnter(){
    
    document.querySelector('ion-tab-bar').style.display = 'none';
    this.geo.getCurrentPosition().then((data)=>{
      this.carregarObras(data.coords.latitude, data.coords.longitude);
    })
  }

  ionViewWillLeave(){
    document.querySelector('ion-tab-bar').style.display = 'flex';
    
  }

  carregarObras(latitude, longitude){
    let body = {
      crud: "carregarObras",
      lat: latitude,
      lgn: longitude
    };

    this.provider.postData(body, 'select.php').subscribe(data => {
      this.obras = data.result
    });
  	
  }

  carregarObrasCep(cep){
    let body = {
      cep: cep,
      crud: "obrasDenunciar"
    };
    
    this.provider.postData(body, 'select.php').subscribe(data => {
      this.obras = data.result
    });
  }

  registrarTermino(idObra){
    this.navCtrl.navigateForward(`/registrar-termino/${idObra}`);
  }
}
