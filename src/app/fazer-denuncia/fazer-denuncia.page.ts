import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostProvider } from '../provider/post-provider';
import { NavController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ModalFotoDenunciaPage } from '../modal-foto-denuncia/modal-foto-denuncia.page';

@Component({
  selector: 'app-fazer-denuncia',
  templateUrl: './fazer-denuncia.page.html',
  styleUrls: ['./fazer-denuncia.page.scss'],

})
export class FazerDenunciaPage {
  idObra
  descricao=""
  irregularidade=""
  irregularidades = []
  idUsuario
  fotosDenuncia = []
  constructor(private activeRoute: ActivatedRoute, private postPvdr: PostProvider, private nav:NavController,private toastCtrl:ToastController,
    private storage: Storage, private loadingController:LoadingController, private modal: ModalController) { }
  ionViewWillEnter(){
    this.idObra = this.activeRoute.snapshot.paramMap.get("idObra");
    this.storage.get("session_storage").then((res)=>{
      let pegar = res;
      this.idUsuario = pegar.codigo;
      console.log(this.idUsuario)
    });
    this.carregarIrregularidades()
  }
  ionViewWillLeave(){

    this.descricao=""
    this.irregularidade=""
    this.fotosDenuncia=[]
    
  }
  async fazerDenuncia(){
    if(this.irregularidade.length==0){
      const toast = await this.toastCtrl.create({
        message: 'Irregularidade é obrigatória' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.descricao.length==0){
      const toast = await this.toastCtrl.create({
        message: 'Descrição é Obrigatória' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else{
      const loading = await this.loadingController.create({
        message: 'Aguarde...',
        });
        let body = {
          idObra:this.idObra,
          idUsuario: this.idUsuario,
          descricao:this.descricao,
          irregularidades: JSON.stringify(this.irregularidade),
          crud:'fazerDenuncia'
        }
        if(this.fotosDenuncia.length<1){
          
          this.postPvdr.postData(body, 'insert.php').subscribe(async data=>{
            console.log(data)
            if(data.success){
              const toast = await this.toastCtrl.create({
                message: 'Denuncia Realizada com Sucesso' ,
                duration: 2000,
                position: 'bottom',
                color: 'dark'
              });
              toast.present();
              this.nav.navigateForward(['/tabs/denuncia']);
            }
          })
        }else{
          this.postPvdr.postMultiUpload('uploadImgDenuncia.php', this.fotosDenuncia, body).then(async data=>{
            let res = JSON.parse(JSON.stringify(data))
            if(res.success){
              this.nav.navigateForward(['/tabs/denuncia']);
              const toast = await this.toastCtrl.create({
                message: 'Denuncia Realizada com Sucesso' ,
                duration: 2000,
                position: 'bottom',
                color: 'dark'
              });
              toast.present();
              
            }else{
              console.log('erro')
            }
          }).catch(e=>console.log(e)).finally(()=>loading.dismiss())
        }
      
      
    }

  }

  carregarIrregularidades(){
    let body = {

      crud: 'irregularidades'
    }
    this.postPvdr.postData(body, 'select.php').subscribe(data =>{
      
      this.irregularidades = data.result
    })
  }

  async abrirModalAddFoto(){
    const modal = await this.modal.create({
      component: ModalFotoDenunciaPage,
      componentProps: {
        fotosObra: this.fotosDenuncia
      },
      
    });
    modal.present();
    modal.onDidDismiss()
    .then((data) => {
      
      this.fotosDenuncia = data['data']
      console.log(this.fotosDenuncia)

  });
  }
}
