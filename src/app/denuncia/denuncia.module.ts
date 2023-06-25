import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DenunciaPage } from './denuncia.page';
import { BrMaskerModule } from 'br-mask';
const routes: Routes = [
  {
    path: '',
    component: DenunciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DenunciaPage]
})
export class DenunciaPageModule {}
