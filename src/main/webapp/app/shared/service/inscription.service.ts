import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Inscription } from '../../entities/model/inscription.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Saison } from '../../entities/model/saison.model';
import { Pair } from '../model/pair';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/public/inscription');
  private resourceUrlSaison = this.applicationConfigService.getEndpointFor('api/public/saison');
  private resourceUrlSituationFamiliale = this.applicationConfigService.getEndpointFor('api/public/situation-familiale');
  private submitted = new BehaviorSubject(false);
  readonly submitted$ = this.submitted.asObservable();

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  inscrire(formData: FormData): Observable<{}> {
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
    });
    return this.http.post(`${this.resourceUrl}`, formData, { headers });
  }

  getInscription(saison: string): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.resourceUrl}/${saison}`);
  }

  getSaisons(): Observable<Saison[]> {
    return this.http.get<Saison[]>(`${this.resourceUrlSaison}`);
  }

  searchInscriptions(saison: string): Observable<Inscription[]> {
    return this.getInscription(saison);
  }

  payeInscription(id: number): Observable<{}> {
    return this.http.patch<[]>(`${this.resourceUrl}/paye/${id}`, {});
  }

  downloadExcel(saison: string): Observable<Blob> {
    return this.http.get(`${this.resourceUrl}/excel/${saison}`, { responseType: 'blob' });
  }

  telechargerFichier(id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/download/piece-jointe/${id}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  getSituationsFamiliale(): Observable<Pair<string, string>[]> {
    return this.http.get<Pair<string, string>[]>(`${this.resourceUrlSituationFamiliale}`);
  }

  flagSubmitForm(): void {
    this.submitted.next(true);
  }

  resetSubmit(): void {
    this.submitted.next(false);
  }
}
