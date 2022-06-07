import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceComponent } from './components/place/place.component';
import { PlacesComponent } from './components/places/places.component';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [AppComponent, PlaceComponent, PlacesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
