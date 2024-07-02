import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SimulateMatchComponent } from './simulate-match/simulate-match.component';
import { PlayerPlacardComponent } from './player-placard/player-placard.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SimulateMatchNormalComponent } from './simulate-match-normal/simulate-match-normal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayerFantasyPlacardComponent } from './player-fantasy-placard/player-fantasy-placard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SimulateMatchComponent,
    PlayerPlacardComponent,
    SimulateMatchNormalComponent,
    PlayerFantasyPlacardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
