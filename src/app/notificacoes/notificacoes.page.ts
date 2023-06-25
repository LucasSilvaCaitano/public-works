import { Component } from '@angular/core';
import { PostProvider } from 'src/app/provider/post-provider';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
})
export class NotificacoesPage {

  constructor(private storage: Storage, private postPvdr: PostProvider, private alertController: AlertController) { }
  idUsuario:number;
  notificacoes=[]
  ionViewWillEnter(){
    
    this.storage.get('session_storage').then((res)=>{
      let pegar = res;
      this.idUsuario = pegar.codigo;

      let body = {
        idUsuario: this.idUsuario,
        crud: 'notificacoes'
      }

      this.postPvdr.postData(body, 'select.php').subscribe(async data => {
        this.notificacoes = [];
        console.log(data);
        if(data.success){
          this.notificacoes = data.result;
          console.log(this.notificacoes)
        }
      });
    });

    
  }

  async verInfoNotif(i){
    const alert = await this.alertController.create({
      
      message: `<h6>Texto: `+this.notificacoes[i]['descricaoNotificao']+`</h6>
                <h6>Data: `+this.notificacoes[i]['dataNotificacao']+`</h6>
                `,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          
        }
      ]
    });

    await alert.present();
  }
}
