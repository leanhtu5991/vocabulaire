import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Metro } from './classes/metro';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuUserComponent,
    MenuAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Metro,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }