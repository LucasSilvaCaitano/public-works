import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalFotoDenunciaPage } from './modal-foto-denuncia.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFotoDenunciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalFotoDenunciaPage]
})
export class ModalFotoDenunciaPageModule {}
