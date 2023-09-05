import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../config/application-config.service';
import { Observable } from 'rxjs';
import { FileDto } from '../../entities/model/fileDto.model';
import { Contact } from '../../entities/model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/public/contact');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  contacter(contact: Contact): Observable<{}> {
    return this.http.post(`${this.resourceUrl}`, contact);
  }
}
