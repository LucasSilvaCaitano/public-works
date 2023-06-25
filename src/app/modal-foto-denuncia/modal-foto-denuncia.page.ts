import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-modal-foto-denuncia',
  templateUrl: './modal-foto-denuncia.page.html',
  styleUrls: ['./modal-foto-denuncia.page.scss'],
})
export class ModalFotoDenunciaPage {
  fotosDenuncia = [];
  constructor(
    private camera:Camera,
    private actionSheetController: ActionSheetController,
    private modal:ModalController,
    private webView:WebView
  ) { }

  async addFoto(){
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
            this.fotosDenuncia.push(imageData);
          
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
            this.fotosDenuncia.push(imageData);
           // this.fotosObra.push(this.webView.convertFileSrc(imageData));
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

  delTodosFoto(){
    this.fotosDenuncia = []
    
  }
  delFoto(i){
    this.fotosDenuncia.splice(i, 1)
  }
  fecharModal(){
    this.modal.dismiss(this.fotosDenuncia);
  }

}
