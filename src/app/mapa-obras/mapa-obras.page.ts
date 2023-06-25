import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PostProvider } from 'src/app/provider/post-provider';
import { Storage } from '@ionic/Storage';


declare var google;
@Component({
  selector: 'app-mapa-obras',
  templateUrl: 'mapa-obras.page.html',
  styleUrls: ['mapa-obras.page.scss']
})
export class MapaObrasPage {

  mapa: any;
  marc: any;

  idUsuario:number;
  pegar:any;
  
  obras:any = [];

  mapRef = null;
  myLatLng
  constructor(
    private geo : Geolocation,
    private loadingCtrl:LoadingController,
    private postPvdr: PostProvider,
    private storage: Storage,
    private alert: AlertController,
    private nav: NavController,
    ) {
   
    }
  ionViewWillEnter(){
    document.querySelector('ion-tab-bar').style.display = 'none';
      this.storage.get('session_storage').then((res)=>{
        this.pegar = res;
        this.idUsuario = this.pegar.codigo;
   
      });
     
          
      this.loadMap()
         
  }
  ionViewWillLeave(){
    document.querySelector('ion-tab-bar').style.display = 'flex';
    
  }
  async loadMap(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.myLatLng = await this.getLocation();

    const mapEle: HTMLElement = document.getElementById('mapa');
    this.mapRef = new google.maps.Map(mapEle,{
      center:this.myLatLng,
      zoom:15,
      disableDefaultUI: true
    });

    google.maps.event
    .addListenerOnce(this.mapRef,'idle',()=>{
      loading.dismiss();
      this.addMaker(this.myLatLng.lat,this.myLatLng.lng);
    });

    
    

    var centerControlDiv = document.createElement('div');
        this.BotaoIcones(centerControlDiv);

        this.mapRef.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    this.carregarObras().then(()=>{
     
        this.loadPoint()
      
      
    }).catch(e => console.log(e));
    
  }

  private addMaker(lat:number,lng:number){
    console.log('Lat: '+lat+'Lgn: '+lng)
    const marker = new google.maps.Marker({
      position:{
        lat,lng
      }, 
      map:this.mapRef,
      title: 'Sua Localização',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
    });

    let content = `
      <div>
        <h6>`+marker.title+`</h6>
      </div>
    `

    this.addInfoWindow(marker, content);
  }

  private async getLocation(){
    const rta = await this.geo.getCurrentPosition();
    return {
      lat:rta.coords.latitude,
      lng:rta.coords.longitude
    };
  }

  loadPoint(){
  //  var auxCon;
    this.marc = [];
    
    for(const key of Object.keys(this.obras)){
      console.log(this.obras[key])
      let latlgn = new google.maps.LatLng(this.obras[key].latitudeObra, this.obras[key].longitudeObra);
      let marc = new google.maps.Marker({
        position: latlgn,
        title: this.obras[key].nome,
        map:this.mapRef,
        icon: 'http://maps.google.com/mapfiles/ms/icons/ylw-pushpin.png'
      });

    /*  if(this.obras[key].status=="Em andamento"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/ylw-pushpin.png';
      }else if(this.obras[key].status=="Paralizada"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png';
      }else if(this.obras[key].status=="Data Ultrapassada"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png';
      }else if(this.obras[key].status=="Finalizada"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png';
      }
   */
    /*  if(this.obras[key].custoFinal!='nulo'){
        auxCon = `
        <div>
          <h6>Nome:`+this.obras[key].nome+`</h6>
          <h6>Custo Previsto: R$ `+this.obras[key].custoPrevisto+`</h6>
          <h6>Custo Final: R$ `+this.obras[key].custoFinal+`</h6>
          <a>Denunciar</a>
        </div>
      `
      }else{
        auxCon = `
        <div>
          <h6>Nome:`+this.obras[key].nome+`</h6>
          <h6>Custo Previsto: R$ `+this.obras[key].custoPrevisto+`</h6>
          
        </div>
      `
      }*/
   
    google.maps.event.addListener(marc, 'click', async () => {
      this.nav.navigateForward(`/info-obras/${this.obras[key].idObra}`);
      

    });
      
    }

    
  }
  carregarObras(){
    return new Promise(resolve => {
    let body = {
      lat: this.myLatLng.lat,
      lgn: this.myLatLng.lng,
      crud: "carregarObras"
    };

      this.postPvdr.postData(body, 'select.php').subscribe(data => {
        
        this.obras = data.result;
        resolve(true)
      });
  	});
  }
  addInfoWindow(marc, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marc, 'click', () => {
      infoWindow.open(this.mapa, marc);
    });
  }

  BotaoIcones(controlDiv, ) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Icones';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', async ()=> {
      
      const alert = await this.alert.create({
        header: 'Icones',
        message: `<ion-grid>
        <ion-row>
    
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/ylw-pushpin.png">
          </ion-col>
    
          <ion-col>
            Obras em andamento
          </ion-col>
    
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/red-pushpin.png">
          </ion-col>    
          <ion-col>
            Obras atrasadas
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png">
          </ion-col>
          <ion-col>
            Data de entraga ultrapassada e Status não confirmado
          </ion-col>
    
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png">
          </ion-col>
          <ion-col>
            Finalizada
          </ion-col>
        </ion-row>
      </ion-grid>`,
        
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              
            }
          }
        ],
    
      });
  
      await alert.present();
    });
  
  }
 
  voltar(){
    this.nav.navigateForward(['/tabs/home']);
  }
}
