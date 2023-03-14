import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';


import { DevRoutingModule } from './dev-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ButtonModule, InputNumberModule,
    DevRoutingModule
  ],
})
export class DevModule { }
