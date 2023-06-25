import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostProvider } from '../provider/post-provider';

@Component({
  selector: 'app-info-obras',
  templateUrl: './info-obras.page.html',
  styleUrls: ['./info-obras.page.scss'],
})
export class InfoObrasPage {

  constructor(private activeRoute: ActivatedRoute, private postPvdr: PostProvider) { }
  idObra
  nome
  imgs
  custo
  aba
  dataInicio
  dataTermino
  ionViewWillEnter(){
    this.idObra = this.activeRoute.snapshot.paramMap.get("idObra");
    
    let body = {
      idObra: this.idObra,
      crud: 'infoObras'
    }
    this.postPvdr.postData(body, 'select.php').subscribe(data =>{
      this.nome = data.result.descricaoObra
      this.imgs = data.result.imagensObra
      this.custo = data.result.custoPrevisto
      this.dataInicio = data.result.dataInicio
      this.dataTermino = data.result.dataPrevistaTermino
    })

    this.segChange('informacoes')
  }

  segChange(aba:string){
    this.aba=aba;
  }
}
