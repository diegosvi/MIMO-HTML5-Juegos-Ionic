import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsernameInputComponent } from 'src/app/componentes/username-input/username-input.component';



@NgModule({
  declarations: [UsernameInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  bootstrap: [UsernameInputComponent],
  exports: [UsernameInputComponent]
})
export class UsernameInputModule { }
