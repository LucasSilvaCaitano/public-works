import { Component } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { PostProvider } from 'src/app/provider/post-provider';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {

  idUsuario:number;
  pegar: any;
  obrasDivulgadas: any = [];

  constructor(
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private alertController: AlertController,
    private navCtrl:NavController
  ) { }
  
  ionViewWillEnter() {
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.idUsuario = this.pegar.codigo;
 
      this.verObras()
    });

    
  }
  
  verObras(){
   
   
      let body = {
        idusuario: this.idUsuario,
        crud: "historicoObras"
      }
      
      this.postPvdr.postData(body, 'select.php').subscribe(async data => {
        this.obrasDivulgadas = [];
        console.log(data);
        if(data.success){
          this.obrasDivulgadas = data.result;
        
        }
      });
    
  }

  async verInfoObra(i:number){
    const alert = await this.alertController.create({
      
      header: 'Detalhes',
      message: `<h6>Custo Previsto: R$ `+this.obrasDivulgadas[i]['custoPrevisto']+`</h6>
                <h6>Data de Inicio: `+this.obrasDivulgadas[i]['dataInicio']+`</h6>
                <h6>Data de Termino: `+this.obrasDivulgadas[i]['dataPrevistaTermino']+`</h6>
                <h6>Orgão Responsavel: `+this.obrasDivulgadas[i]['descricaoOrgaoResponsavel']+`</h6>`,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          
        }
      ]
    });

    await alert.present();
  }/*

  async verInfoDenuncia(i:number){
    console.log(this.obrasDenunciadas)
    const alert = await this.alertController.create({
      
      header: 'Detalhes',
      message: `<h6>Nome da Obra: `+this.obrasDenunciadas[i]['nomeObra']+`</h6>
                <h6>Data da denuncia: `+this.obrasDenunciadas[i]['dataHoraDenuncia']+`</h6>
                <h6>Descrição: `+this.obrasDenunciadas[i]['descricaoDenuncia']+`</h6>
                <h6>Status: `+this.obrasDenunciadas[i]['descricaoStatusDenuncia']+`</h6>`,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          
        }
      ]
    });

    await alert.present();
  }*/
}
