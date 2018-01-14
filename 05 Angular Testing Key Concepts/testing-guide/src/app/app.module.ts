import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SellerComponent } from './seller/seller.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
