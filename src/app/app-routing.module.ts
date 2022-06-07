import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceComponent } from './components/place/place.component';
import { PlacesComponent } from './components/places/places.component';

const routes: Routes = [
  {
    path: 'places',
    title: 'LocalSearch',
    component: PlacesComponent,
  },
  {
    path: 'places/:id',
    title: 'Place',
    component: PlaceComponent,
  },
  {
    path: '',
    redirectTo: 'places',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
