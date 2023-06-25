import { Component } from '@angular/core';
import { PostProvider } from '../provider/post-provider';
import { Storage } from '@ionic/Storage';
import { ToastController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-denuncias-realizadas',
  templateUrl: './denuncias-realizadas.page.html',
  styleUrls: ['./denuncias-realizadas.page.scss'],
})
export class DenunciasRealizadasPage {
 // this.nav.navigateForward(`/info-obras/${this.obras[key].idObra}`);
  constructor(private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private alertController: AlertController,
    private navCtrl:NavController) { }
  idUsuario:number;
  pegar: any;
  denuncias: any = [];
  

  ionViewWillEnter() {
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.idUsuario = this.pegar.codigo;
 
      this.verDenuncias()
    });

    
  }

  verDenuncias(){
   
   
    let body = {
      idusuario: this.idUsuario,
      crud: "historicoDenuncias"
    }
    
    this.postPvdr.postData(body, 'select.php').subscribe(async data => {
      this.denuncias = [];
      console.log(data);
      if(data.success){
        this.denuncias = data.result;
      
      }
    });
  
}
  async verInfoDenucia(idDenuncia){
    this.navCtrl.navigateForward(`/info-denuncia/${idDenuncia}`);
   /* const alert = await this.alertController.create({
      
      header: 'Detalhes',
      message: `<h6>Obra Denunciada `+this.denuncias[i]['nomeObra']+`</h6>
                <h6>Data da Denuncia: `+this.denuncias[i]['dataHoraDenuncia']+`</h6>
                <h6>Descrição: `+this.denuncias[i]['descricaoDenuncia']+`</h6>
                <h6>Status: `+this.denuncias[i]['descricaoStatusDenuncia']+`</h6>`
                ,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          
        }
      ]
    });

    await alert.present();*/
  }
}
