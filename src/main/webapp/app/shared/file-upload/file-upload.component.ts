import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PieceJointeType } from '../../enums/pieceJointeType';
import { FileHandle } from '../../entities/model/file-handle.model';
import { UploadFileInscription } from '../../entities/model/upload-file-inscription';

@Component({
  selector: 'jhi-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() afficherErreur: boolean;
  @Input() type: PieceJointeType;
  @Output() file: EventEmitter<UploadFileInscription> = new EventEmitter<UploadFileInscription>();
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  erreurFormat: string = null;

  onChange(event: any): void {
    const file: File = event.target.files[0];
    if (this.validateFile(file)) {
      this.file.emit({ pieceJointeType: this.type, file });
    }
  }

  getLibelle(): string {
    switch (this.type) {
      case PieceJointeType.ASSURANCE:
        return "Attestation d'assurance";
      case PieceJointeType.CERTIFICAT_MEDICAL:
        return 'Certificat médical';
      default:
        return '';
    }
  }

  private validateFile(file: File): boolean {
    if (!this.allowedTypes.includes(file.type)) {
      this.erreurFormat = 'Le format du fichier est incorrect (seulement JPG, JPEG, PNG, GIF, PDF)';
      return false;
    }
    this.erreurFormat = null;
    return true;
  }
}
