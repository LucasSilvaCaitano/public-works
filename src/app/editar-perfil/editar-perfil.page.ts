import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { AlertController, ToastController, ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { PostProvider } from '../provider/post-provider';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ModalpreviewfotoPage } from '../modalpreviewfoto/modalpreviewfoto.page';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  
  id:number;
  senha:string;
  foto:string;
  pegar: any;
  //nomeImagem;

  constructor(
    private navCtrl:NavController,
    private storage: Storage,
    private alert: AlertController,
    private toastCtrl: ToastController,
    private provider:PostProvider,
    private actionSheetController: ActionSheetController, 
    private camera: Camera,
    private webView: WebView,
    private modal:ModalController
    ) { }

  ionViewWillEnter(){
    
    document.querySelector('ion-tab-bar').style.display = 'none';
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.id = this.pegar.codigo;
      this.senha = this.pegar.senha;
      this.foto = this.pegar.foto;
      
    });
    
  }

  ionViewWillLeave(){
    document.querySelector('ion-tab-bar').style.display = 'flex';
    
  }

  voltar(){
    
    this.navCtrl.navigateForward(['/tabs/home']);
  }
  async editarFoto(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Pegar Imagem',
      buttons: [{
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation:true,
            allowEdit: true,
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          
          this.camera.getPicture(options).then(async (imageData) => {
            
            this.abrirModalPreviewFoto(imageData, this.webView.convertFileSrc(imageData));
          }, (err) => {
            console.log(err);
          });
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            correctOrientation:true,
            allowEdit: true,
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          
          this.camera.getPicture(options).then(async (imageData) => {
            
            this.abrirModalPreviewFoto(imageData, this.webView.convertFileSrc(imageData));
          }, (err) => {
            console.log(err);
          });
          
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async editarEmail(){
    const alert = await this.alert.create({
      header: 'Editar E-Mail',
      inputs: [{
        name: 'email',
        type: 'text',
        placeholder: 'E-Mail'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            ;
          }
        }, {
          text: 'Editar',
          handler: () => {
            
          }
        }
      ],
  
    });

    await alert.present();
  }

  async abrirModalPreviewFoto(arquivoImg, imgPreview){
   // this.provider.postUpload('teste.php', arquivoImg, this.id.toString()).then(data=>console.log(data))
    const modal = await this.modal.create({
      component: ModalpreviewfotoPage,
      componentProps: {
        idUsuario: this.id,
        imgPreview: imgPreview,
        arquivoImg: arquivoImg
      },
      cssClass: 'my-custom-modal-css'
      
    });
    modal.present();
    modal.onDidDismiss()
    .then(() => {
      this.ionViewWillEnter()
  });
  }

  async editarSenha(){
    const alert = await this.alert.create({
      header: 'Editar Senha',
      inputs: [
        {
        name: 'senha',
        type: 'password',
        placeholder: 'Senha antiga'
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha'
        },
        {
          name: 'confNovaSenha',
          type: 'password',
          placeholder: 'Confirmar nova senha'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: 'Editar',
          handler: async (data) => {
            if(data.senha==""){
              const toast = await this.toastCtrl.create({
                message: 'Digite a senha antiga',
                duration: 2000
              });
              toast.present()
            }else if(data.novaSenha==""){
              const toast = await this.toastCtrl.create({
                message: 'Digite a nova senha',
                duration: 2000
              });
              toast.present()
            }else if(data.confNovaSenha==""){
              const toast = await this.toastCtrl.create({
                message: 'Digite a confirmação da nova senha',
                duration: 2000
              });
              toast.present()
            }else if(data.novaSenha!=data.confNovaSenha){
              const toast = await this.toastCtrl.create({
                message: 'Senhas diferentes',
                duration: 2000
              });
              toast.present()
            }else if(data.senha!=this.senha){
              const toast = await this.toastCtrl.create({
                message: 'Senha antiga incorreta',
                duration: 2000
              });
              toast.present()
            }else{
              let body = {
                id: this.id,
                senha: data.novaSenha,
                crud: 'editarSenha'
              }
              this.provider.postData(body, 'update.php').subscribe(async data=>{
                if(data.success){
                  const toast = await this.toastCtrl.create({
                    message: 'Senhas atualizadas com sucesso' ,
                    duration: 2000,
                    position: 'bottom',
                    color: 'dark'
                  });
                  toast.present();
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
        }
      ],
  
    });

    await alert.present();
  }
  
  async editarNotificacao(){
    const alert = await this.alert.create({
      header: 'Receber notificações via...',
      mode: 'md',
      inputs: [
        
        {
          
          name: 'radio',
          type: 'radio',
          label: 'App'
        },
        {
        name: 'radio1',
        type: 'radio',
        label: 'Email',
        
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Desativar notificações'
        }
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, 
            
        
      ],
  
    });

    await alert.present();
  }

}
