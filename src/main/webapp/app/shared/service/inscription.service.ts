import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Contact } from '../../entities/model/contact.model';
import { Inscription } from '../../entities/model/inscription.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Saison } from '../../entities/model/saison.model';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/public/inscription');
  private resourceUrlSaison = this.applicationConfigService.getEndpointFor('api/public/saison');

  private inscriptionsSubject = new BehaviorSubject<Inscription[]>([]);
  readonly inscriptionsSuject$ = this.inscriptionsSubject.asObservable();

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  inscrire(inscription: Inscription): Observable<{}> {
    return this.http.post(`${this.resourceUrl}`, inscription);
  }

  getInscription(saison: String): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.resourceUrl}/${saison}`);
  }

  getSaisons(): Observable<Saison[]> {
    return this.http.get<Saison[]>(`${this.resourceUrlSaison}`);
  }

  searchInscriptions(saison: string): void {
    this.getInscription(saison).subscribe(data => {
      console.log(data);
      this.inscriptionsSubject.next(data);
    });
  }

  payeInscription(id: number): Observable<{}> {
    return this.http.patch<[]>(`${this.resourceUrl}/paye/${id}`, {});
  }

  downloadExcel(saison: string): Observable<Blob> {
    return this.http.get(`${this.resourceUrl}/excel/${saison}`, { responseType: 'blob' });
  }
}
