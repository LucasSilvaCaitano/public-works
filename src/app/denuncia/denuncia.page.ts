import { Component } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { PostProvider } from '../provider/post-provider';
import { Storage } from '@ionic/Storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.page.html',
  styleUrls: ['./denuncia.page.scss'],
})
export class DenunciaPage {
  obras: any;
  postPvdr: any;
  irregularidade :String;
  idUsuario: number;
  pegar:any;
  idObra: any;
  foto: any;

  

  constructor(private provider:PostProvider,private storage: Storage
    , private toastCtrl: ToastController
      ,private navCtrl: NavController, private alert: AlertController,
      private geo : Geolocation,) { }

  ionViewWillEnter(){
    this.storage.get("session_storage").then((res)=>{
      this.pegar = res;
      this.idUsuario = this.pegar.codigo;
      console.log(this.idUsuario)
    });
    
    
    this.geo.getCurrentPosition().then((data)=>{
      this.carregarObras(data.coords.latitude, data.coords.longitude);
    })
    document.querySelector('ion-tab-bar').style.display = 'none';
  }

  ionViewWillLeave(){
    document.querySelector('ion-tab-bar').style.display = 'flex';
    
  }

  voltar(){
      this.navCtrl.navigateBack(['/tabs/home']);
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
  
  async fazerDenuncia(idObra){

    this.navCtrl.navigateForward(`/fazer-denuncia/${idObra}`);
    
  /*  this.idObra = idObra;
    const alert = await this.alert.create({
      header: 'Fazer Denuncia',
      inputs: [{
        name: 'descricaoDenuncia',
        type: 'text',
        placeholder: 'Descrição da Denuncia'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: 'Denunciar',
          handler: async (data) =>{
            let body = {
            idUsuario:this.idUsuario,
            idObra: this.idObra,
            descricao: data.descricaoDenuncia,
            crud: "fazerDenuncia"
          }
            
          this.provider.postData(body, 'insert.php').subscribe(async data=>{
            if(data.success){
              const toast = await this.toastCtrl.create({
                message: 'Denuncia Realizada com sucesso' ,
                duration: 2000,
                position: 'bottom',
                color: 'dark'
                });
                this.navCtrl.navigateForward(['/tabs/home']);
                toast.present();
                this.idObra ="" ;
                this.idUsuario = null;
              }else{
                const toast = await this.toastCtrl.create({
                  message: data.msg ,
                  duration: 2000,
                  position: 'bottom',
                  color: 'dark'
                });
                toast.present();
              }
            })
          }
        }
      ],
  
    });

    await alert.present();*/
  }
}
