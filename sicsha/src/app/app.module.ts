import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "./../environments/environment";

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
