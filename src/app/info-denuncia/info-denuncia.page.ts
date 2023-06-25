import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostProvider } from '../provider/post-provider';

@Component({
  selector: 'app-info-denuncia',
  templateUrl: './info-denuncia.page.html',
  styleUrls: ['./info-denuncia.page.scss'],
})
export class InfoDenunciaPage {

  constructor(private activeRoute: ActivatedRoute, private postPvdr: PostProvider) { }
  idDenuncia
  nomeObra
  dataDenuncia
  descricaoDenuncia
  status
  resposta
  irregularidades
  ionViewWillEnter(){
    this.idDenuncia = this.activeRoute.snapshot.paramMap.get("idDenuncia");
    
    this.carregarInfoDenuncias()
  }

  carregarInfoDenuncias(){
    let body = {
      idDenuncia: this.idDenuncia,
      crud: 'infoDenuncia'
    }

    this.postPvdr.postData(body, 'select.php').subscribe(data=>{
      this.nomeObra = data.result.nomeObra
      this.dataDenuncia = data.result.dataHoraDenuncia
      this.descricaoDenuncia = data.result.descricaoDenuncia
      this.status = data.result.descricaoStatusDenuncia
      this.resposta = data.result.resposta
      this.irregularidades = data.result.irregularidades
      console.log(this.irregularidades)
    })
  }
}
