import { Component } from '@angular/core';
import { ToastController, ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../provider/post-provider';

@Component({
  selector: 'app-modalpreviewfoto',
  templateUrl: './modalpreviewfoto.page.html',
  styleUrls: ['./modalpreviewfoto.page.scss'],
})
export class ModalpreviewfotoPage{

  constructor(
    private modal:ModalController,
    private toastCtrl: ToastController,
    private actionSheetController: ActionSheetController, 
    private camera: Camera,
    private webView: WebView,
    private loadingController: LoadingController,
    private storage: Storage,
    private postProvider: PostProvider
  ) {

  }
  imgPreview
  arquivoImg
  idUsuario


  fecharModal(){
    this.modal.dismiss();
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
            
            this.imgPreview = this.webView.convertFileSrc(imageData);
            this.arquivoImg = imageData
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
            
            this.imgPreview = this.webView.convertFileSrc(imageData);
            this.arquivoImg = imageData
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

  async salvar(){
    
    const loading = await this.loadingController.create({
     message: 'Salvando...',
     });
   await loading.present();
   
     let body = {
       idUsuario: this.idUsuario
     }

  this.postProvider.postUpload('upload.php', this.arquivoImg, body).then(async data=>{
    console.log(data)
    let res = JSON.parse(JSON.stringify(data))
    if(res.success){
      const toast = await this.toastCtrl.create({
        message: 'Foto atualizada com sucesso',
        duration: 2000
      });
      toast.present()
      
      this.storage.get('session_storage').then((resultStorage)=>{
        let result = resultStorage;
        
        result.foto = res.foto
        
        this.storage.set('session_storage', result).then(()=>{
          this.fecharModal()
        });
      });
    }else{
 
      console.log('erro')
    }
  }).catch(e=>console.log(e)).finally(()=>loading.dismiss())
  
 }
}
