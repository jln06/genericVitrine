import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EditModeService } from '../../../core/service/edit-mode.service';
import { AlertService } from '../../../core/util/alert.service';
import { DataUtils } from '../../../core/util/data-util.service';
import { FileHandle } from '../../../entities/model/file-handle.model';

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
        if (!this.singleMode) {
          Array.from(files as File[]).forEach(f => this.pushFile(f));
        } else {
          this.pushFile(files[0]);
        }
      }
      this.fileHandleUploaded.emit(this.filesHandle);
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

  pushFile(file: File): void {
    this.filesHandle.push(this.dataUtils.fileToFileHandle(file));
  }
}
