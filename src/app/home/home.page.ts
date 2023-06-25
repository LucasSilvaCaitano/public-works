import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/provider/post-provider';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})
export class HomePage {

  nome: string;
  foto: string;
  pegar: any;
  codigo
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private postPvdr: PostProvider,
    private fcm: FCM,
    private alertController:AlertController
  ) {}
    
  
  ionViewWillEnter(){
    
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.nome = this.pegar.nome;
      this.foto = this.pegar.foto;
      this.codigo = this.pegar.codigo

      this.fcm.getToken().then(tokenF => {
        let body = {
          token:tokenF,
          idUsuario: this.codigo,
          crud:'atualizaTokenNotificacao'
        }

        this.postPvdr.postData(body, 'update.php').subscribe(data=>{
          console.log(data)
        })
      });

      console.log(res)
    });

    this.fcm.onNotification().subscribe(async data => {
      console.log(data)
      
        if(data.denuncia){
          const alert = await this.alertController.create({
      
            header: data.titulo,
            message: data.corpo,
            buttons: [
              {
                text: 'Fechar',
                role: 'cancel',
                cssClass: 'secondary',
                
              }
            ]
          });
      
          await alert.present();
        
      };
    });
  }
  
  editarPerfil(){
    this.navCtrl.navigateForward(['/tabs/editar-perfil/']);
  }
  
  logout(){
    
    this.storage.clear();
    this.navCtrl.navigateForward(['/tabs/login']);
  }

  cadastrarObra(){
    this.navCtrl.navigateForward(['/tabs/divulgar-obra']);
  }
  acompanharObra(){
    this.navCtrl.navigateForward(['/tabs/mapa-obras']);
  }
  fazerDenuncia(){
    this.navCtrl.navigateForward(['/tabs/denuncia']);
  }
  finalizar(){
    this.navCtrl.navigateForward(['/tabs/finalizer']);
  }
}
