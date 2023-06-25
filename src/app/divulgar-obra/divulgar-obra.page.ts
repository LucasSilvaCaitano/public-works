import { Component } from '@angular/core';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { Http } from '@angular/http';
import { PostProvider } from 'src/app/provider/post-provider';
import { ModalfotoobraPage } from '../modalfotoobra/modalfotoobra.page';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-divulgar-obra',
  templateUrl: 'divulgar-obra.page.html',
  styleUrls: ['divulgar-obra.page.scss'],

})
export class DivulgarObraPage {
  

  nomeObra:string="";
  custoPrevisto:string="";
  dataInicio: string="";
  dataTermino: string="";
  cep: string="";
  logradouro: string="";
  bairro: string="";
  orgao: string="";
  idUsuario:number;
  pegar:any;
  lat:number;
  lng:number;
  fotosObra = [];
  orgaos = [];
  customAlertOptions: any = {
    
    cssClass: 'my-class'
  };
  constructor(
    private toastCtrl: ToastController,
    private storage: Storage,
    private provider:PostProvider,
    private http:Http,
    private modal: ModalController,
    private camera: Camera,
    private loadingController:LoadingController,
    private ocr: OCR,
    private navController:NavController,

    ) {}

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.idUsuario = this.pegar.codigo;
    
    });

    this.carregarOrgaos()

    document.querySelector('ion-tab-bar').style.display = 'none';
  }

  ionViewWillLeave(){
    document.querySelector('ion-tab-bar').style.display = 'flex';
    this.nomeObra=""
    this.custoPrevisto=""
    this.dataInicio=""
    this.dataTermino=""
    this.cep=""
    this.logradouro=""
    this.bairro=""
    this.orgao = ""
    this.fotosObra=[]
  }

  buscaCep(cep:string){

    this.logradouro="Carregando...";
    this.bairro="Carregando...";
    this.http.get('https://viacep.com.br/ws/'+cep+'/json/').subscribe(data => {
      const endereco = (data as any);
      const enderecoJSON = JSON.parse(endereco._body);

      this.logradouro = enderecoJSON.logradouro;
      this.bairro = enderecoJSON.bairro;
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.cep+','+this.logradouro.split(' ').join('%20')+','+this.bairro.split(' ').join('%20')+'&key=AIzaSyDf34DBCuE_fI47Twb47ZpIY38C7D-pbNY').subscribe(data2 => {
        
        const latLgl = (data2 as any);
        const latLglJSON = JSON.parse(latLgl._body);

        this.lat = latLglJSON.results[0].geometry.bounds.northeast.lat;
        this.lng = latLglJSON.results[0].geometry.bounds.northeast.lng;
        
          }, error =>{
            this.lat = 0;
            this.lng = 0;
            console.log(error);
          }
        );
        },async error =>{

          this.logradouro="";
          this.bairro="";

          const toast = await this.toastCtrl.create({
            message: 'CEP Invalido' ,
            duration: 2000,
            position: 'bottom',
            color: 'dark'
          });
          toast.present();
        }
      );

      
  }
 
  async cadastrarObra(){
    
    if(this.nomeObra==""){
      const toast = await this.toastCtrl.create({
        message: 'Nome da obra é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.custoPrevisto==""){
      const toast = await this.toastCtrl.create({
        message: 'Custo previsto é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.dataInicio==""){
      const toast = await this.toastCtrl.create({
        message: 'Data de inicio é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.dataTermino==""){
      const toast = await this.toastCtrl.create({
        message: 'Data de termino é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.cep==""){
      const toast = await this.toastCtrl.create({
        message: 'CEP é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.logradouro==""){
      const toast = await this.toastCtrl.create({
        message: 'Logradouro é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.bairro==""){
      const toast = await this.toastCtrl.create({
        message: 'Bairro é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.orgao==""){
      const toast = await this.toastCtrl.create({
        message: 'Orgão responsavel é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.fotosObra.length<1){
      const toast = await this.toastCtrl.create({
        message: 'É obrigatório pelo menos 1 foto da obra' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else{
      
      let body = {
        idUsuario:this.idUsuario,
        nomeObra: this.nomeObra,
        custoPrevisto: this.custoPrevisto,
        dataInicio: this.dataInicio,
        dataTermino: this.dataTermino,
        cep: this.cep,
        logradouro: this.logradouro,
        bairro: this.bairro,
        latitude: this.lat,
        longitude: this.lng,
        orgao: this.orgao,
      }
      const loading = await this.loadingController.create({
        message: 'Aguarde...',
        });
        
      await loading.present();
      this.provider.postMultiUpload('uploadImgObra.php', this.fotosObra, body).then(async data=>{
        
        let res = JSON.parse(JSON.stringify(data))
        if(res.success){
          this.navController.navigateForward(['/tabs/home']);
          const toast = await this.toastCtrl.create({
            message: 'Obra cadastrada com sucesso' ,
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
 
  async abrirModalAddFoto(){
      const modal = await this.modal.create({
        component: ModalfotoobraPage,
        componentProps: {
          fotosObra: this.fotosObra
        },
        
      });
      modal.present();
      modal.onDidDismiss()
      .then((data) => {
        
        this.fotosObra = data['data']
      //  this.provider.postMultiUpload('teste.php', this.fotosObra).then((data)=>console.log(data))
        

    });
  }
  
  tirarFotoPlaca(){
   
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation:true,
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
      this.fazerOCR(imageData)
    }, (err) => {
      console.log(err);
    });

  }

  selecionarFotoPlaca(){
   
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation:true,
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
      this.fazerOCR(imageData)
    }, (err) => {
      console.log(err);
    });

  }

  async fazerOCR(img){
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      });
      this.ocr.recText(OCRSourceType.NORMFILEURL, img)
      .then( (res: OCRResult) => 
        {
          console.log(res)
          let result = JSON.stringify(res.lines.linetext)

          
           // for(let r of res.lines.linetext){
            //  console.log(result)
              let valor = result.substring(result.search(/total/i), result.search(/total/i)+40)
              
              let nome = result.substring(result.search(/constru[çc][aã]o|execu[cç][aã]o/i), result.search(/agentes|valor/i)).replace(/",/g, ' ').replace(/"/g,'')
            
            this.nomeObra = nome
              //  console.log(valor.search(/[0-9]/))
            //  console.log(valor.charAt(valor.indexOf('"')))
            //  console.log(valor.substring(valor.search(/[0-9]/), valor.indexOf('"')))

              this.custoPrevisto = valor.substring(valor.search(/[0-9]/), valor.indexOf('"'))
    //      console.log(result.substring(result.search(/^(?!0\,00)\d{1,3}(.\d{3})*(\,\d\d)?$/)))
             // console.log("////////")

              let dataInicio = result.substring(result.search(/In[íi]cio da Obra/i), result.search(/In[íi]cio da Obra/i)+31)
           //   console.log(dataInicio.search(/[0-9]/))
           //   console.log(dataInicio.charAt(dataInicio.indexOf('"')))
           //   console.log(this.FormataStringData(dataInicio.substring(dataInicio.search(/[0-9]/), dataInicio.indexOf('"'))))

              this.dataInicio = this.FormataStringData(dataInicio.substring(dataInicio.search(/[0-9]/), dataInicio.indexOf('"')))

              let dataTermino = result.substring(result.search(/T[ée]rmino da Obra/i), result.search(/T[ée]rmino da Obra/i)+31)
            //  console.log(dataTermino.search(/[0-9]/))
            //  console.log(dataTermino.charAt(dataTermino.indexOf('"')))
           //   console.log(this.FormataStringData(dataTermino.substring(dataTermino.search(/[0-9]/), dataTermino.indexOf('"'))))

              this.dataTermino = this.FormataStringData(dataTermino.substring(dataTermino.search(/[0-9]/), dataTermino.indexOf('"')))
            
            //  console.log(result.substring(result.search(/minist[eé]rio/i)))
              //}
              
            
            loading.dismiss()
        }).catch(e =>{
          loading.dismiss()
          console.log(e)
        } )
    }

FormataStringData(data) {
      var dia  = data.split("/")[0];
      var mes  = data.split("/")[1];
      var ano  = data.split("/")[2];
      if(ano.length==2){
        ano = '20'+ano
      }
      return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
      // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
    }


    carregarOrgaos(){
      let body = {
        crud: 'orgaos'
      }

      this.provider.postData(body, 'select.php').subscribe(data =>{
        this.orgaos = []
        this.orgaos=data.result
      })
    }
}

