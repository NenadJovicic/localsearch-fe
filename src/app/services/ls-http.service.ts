import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlaceDto } from '../models/place';

@Injectable()
export class LsHttpService {
  private baseUrl = 'http://localhost:3000';
  private testIds: string[] = [
    'GXvPAor1ifNfpF0U5PTG0w',
    'ohGSnJtMIC5nPfYRi_HTAg',
  ];
  constructor(private readonly httpClient: HttpClient) {}

  getPlacePerId$(id: string): Observable<PlaceDto> {
    return this.httpClient.get<PlaceDto>(`${this.baseUrl}/places/${id}`);
  }

  // introduced to fake list of places
  getIdsForPlaces$(): Observable<string[]> {
    const subject = new BehaviorSubject(this.testIds);
    return subject.asObservable();
  }
}
