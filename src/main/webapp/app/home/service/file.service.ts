import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { map } from 'rxjs/operators';
import { FileDto } from '../../entities/model/fileDto.model';
import { FileHandle } from '../../entities/model/file-handle.model';
import { Page } from '../../entities/model/page.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/public/galerie');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  recupererGalerieNoms(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.resourceUrl}/recuperer-galerie`)
      .pipe(map(d => d.map(str => `${this.resourceUrl}/downloadFile/galerie/${str}`)));
  }

  recupererGalerieFiles(): Observable<FileDto[]> {
    const params = this.getParam('GALERIE');
    return this.http.get<FileDto[]>(`${this.resourceUrl}`, { params });
  }

  recupererPhotoDescription(): Observable<FileDto[]> {
    const params = this.getParam('PRESENTATION');
    return this.http.get<FileDto[]>(`${this.resourceUrl}`, { params });
  }

  recupererPhotoBanniere(): Observable<FileDto[]> {
    const params = this.getParam('BANNIERE');
    return this.http.get<FileDto[]>(`${this.resourceUrl}`, { params });
  }

  recupererPhotoGoodies(): Observable<FileDto[]> {
    const params = this.getParam('GOODIES');
    return this.http.get<FileDto[]>(`${this.resourceUrl}`, { params });
  }

  addImage(
    fileHande: FileHandle,
    imageEnum: string,
    idImage: number | null = null,
    description: string | null = null,
    prix: string | null = null
  ): Observable<FileDto[]> {
    let params: HttpParams = this.getParam(imageEnum);
    if (idImage != null) {
      params = params.set('id', idImage);
    }
    const formData = new FormData();
    let file1 = fileHande.file;
    formData.append('file', file1, file1.name);
    if (description != null) {
      formData.append('description', description);
    }
    if (prix != null) {
      formData.append('prix', prix);
    }
    return this.http.post<FileDto[]>(`${this.resourceUrl}`, formData, { params });
  }

  deletePhoto(ids: number[]): Observable<{}> {
    const params = this.getParam('BANNIERE');
    return this.http.delete(`${this.resourceUrl}/${ids}`, { params });
  }

  recupererGalerieFilesPageable(page: number, size: number): Observable<Page<FileDto>> {
    let params = this.getParam('GALERIE');
    params = params.set('size', size);
    params = params.set('page', page);
    console.log('httpParams : ', params);
    return this.http.get<Page<FileDto>>(`${this.resourceUrl}/pageable`, { params });
  }

  private getParam(variableName: string): HttpParams {
    return new HttpParams().set('codeImage', variableName);
  }
}
