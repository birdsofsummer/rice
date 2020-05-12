import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
      CommonModule,
      NzTableModule,
      FormsModule,
      UserRoutingModule,
  ],
  exports: [UserComponent],

})
export class UserModule { }
