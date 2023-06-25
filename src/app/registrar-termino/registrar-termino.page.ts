import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostProvider } from '../provider/post-provider';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-termino',
  templateUrl: './registrar-termino.page.html',
  styleUrls: ['./registrar-termino.page.scss'],
  providers: [DatePipe]
})
export class RegistrarTerminoPage  {
  idObra
  dataTermino
  constructor(private activeRoute: ActivatedRoute, private datePipe: DatePipe, private postPvdr: PostProvider,
    private toastCtrl:ToastController, private navCtrl:NavController) { }

  ionViewWillEnter(){
    this.idObra = this.activeRoute.snapshot.paramMap.get("idObra");
    
    this.dataTermino = this.datePipe.transform(new Date,"yyyy-MM-dd");
  }

  registrarTermino(){
    let body = {
      dataTermino: this.dataTermino,
      idObra: this.idObra,
      crud: 'registrarTermino'
    }

    this.postPvdr.postData(body, 'insert.php').subscribe(async data =>{
      if(data.success){
        const toast = await this.toastCtrl.create({
          message: 'Término Registrado com Sucesso' ,
          duration: 2000,
          position: 'bottom',
          color: 'dark'
        });
        toast.present();

        this.navCtrl.navigateForward(['/tabs/home']);
      }
    })
  }
}
