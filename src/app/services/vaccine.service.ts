import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccine} from '../types/Vaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private http: HttpClient) {
  }

  public getAllVaccineData = (): Observable<Vaccine[]> => {
    return this.http.get<Vaccine[]>('https://data.cdc.gov/resource/saz5-9hgg.json');
  }
}
