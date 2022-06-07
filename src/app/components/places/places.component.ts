import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LsHttpService } from '../../services/ls-http.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent {
  ids: string[] = [];

  constructor(
    private readonly lsHttpService: LsHttpService,
    private readonly router: Router
  ) {
    this.lsHttpService.getIdsForPlaces$().subscribe((ids) => {
      this.ids = ids;
    });
  }

  openPlaceDetails(id: string) {
    this.router.navigate(['../places', id]);
  }
}
