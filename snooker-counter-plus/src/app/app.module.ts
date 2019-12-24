import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AddPlayerModal} from "./modals/add-player/add-player.modal";
import { ReactiveFormsModule } from '@angular/forms';
import { FoulModal } from './modals/foul/foul.modal';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerModal,
    FoulModal
  ],
  entryComponents: [
    AddPlayerModal,
    FoulModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
