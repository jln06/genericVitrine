import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { Variable } from '../../entities/model/variable.model';
import { VariableComponentEnum } from '../../enums/VariableComponentEnum';

@Injectable({
  providedIn: 'root',
})
export class VariableService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/public/variable');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getVariable(variableCode: VariableComponentEnum): Observable<Variable> {
    const params = new HttpParams().set('codeVariable', variableCode.toString());
    return this.http.get<Variable>(`${this.resourceUrl}`, { params });
  }

  updateVariable(variable: Variable): Observable<{}> {
    const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
    const url = `${this.resourceUrl}`;
    return this.http.post<Variable>(url, variable, { headers: headers });
  }
}
