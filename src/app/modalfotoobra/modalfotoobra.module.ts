import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalfotoobraPage } from './modalfotoobra.page';

const routes: Routes = [
  {
    path: '',
    component: ModalfotoobraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalfotoobraPage]
})
export class ModalfotoobraPageModule {}
