import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, Observer } from 'rxjs';
import { EditModeService } from '../../../home/service/edit-mode.service';
import { AlertService } from '../../util/alert.service';
import { DataUtils } from '../../util/data-util.service';
import { FileHandle } from '../../../entities/model/file-handle.model';
import * as imageConversion from 'image-conversion';

@Component({
  selector: 'jhi-galerie-upload',
  templateUrl: './galerie-upload.component.html',
  styleUrls: ['./galerie-upload.component.scss'],
})
export class GalerieUploadComponent implements OnInit {
  @Input()
  filesHandle: FileHandle[];
  fileActuelle: FileHandle[];
  @Input()
  onlyIcon: boolean = true;
  @Output() fileHandleUploaded: EventEmitter<FileHandle[]> = new EventEmitter<FileHandle[]>();
  @Input()
  singleMode: boolean;

  isEditMode: Observable<boolean>;

  constructor(private editModeService: EditModeService, private dataUtils: DataUtils, private alertService: AlertService) {}

  ngOnInit(): void {
    this.isEditMode = this.editModeService.isEditMode$;
  }

  processUploadFile(event): void {
    const files = event.target.files;
    if (this.verificationFormatImage(files)) {
      if (files.length > 0) {
        this.filesHandle = [];
        const observables: Observable<void>[] = [];
        if (!this.singleMode) {
          Array.from(files as File[]).forEach(f => {
            observables.push(this.pushFile(f));
          });
        } else {
          observables.push(this.pushFile(files[0]));
        }
        forkJoin(observables).subscribe(() => {
          this.fileHandleUploaded.emit(this.filesHandle);
        });
      }
    }
  }

  private verificationFormatImage(files: any) {
    let isValid = true;
    if (files && files.length > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      for (const element of files) {
        const file = element;
        if (!allowedTypes.includes(file.type)) {
          isValid = false;
        }
      }
      if (!isValid) {
        this.alertService.addAlert({
          type: 'danger',
          message: 'Veuillez sélectionner uniquement des fichiers au format JPEG, PNG ou GIF.',
          toast: true,
          timeout: 100000,
          position: 'top left',
        });
      }
    }
    return isValid;
  }

  pushFile(file: File): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      imageConversion
        .compress(file, 1)
        .then(res => {
          const fileCompressed = new File([res], file.name, { type: res.type });
          this.filesHandle.push(this.dataUtils.fileToFileHandle(fileCompressed));
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error); // Émettre une erreur en cas d'échec
        });
    });
  }
}
