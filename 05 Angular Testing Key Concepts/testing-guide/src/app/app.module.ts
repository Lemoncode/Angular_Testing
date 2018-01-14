import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SellerComponent } from './seller/seller.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
