import { Component, OnInit } from '@angular/core';
import { Description } from '../../entities/model/description.model';
import { forkJoin, Observable } from 'rxjs';
import { FileHandle } from '../../entities/model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { EditModeService } from '../service/edit-mode.service';
import { HttpClient } from '@angular/common/http';
import { VariableService } from '../service/variable.service';
import { VariableComponentEnum } from '../../enums/VariableComponentEnum';
import { FileService } from '../service/file.service';
import { FileDto } from '../../entities/model/fileDto.model';
import { DataUtils } from '../util/data-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../admin/user-management/user-management.model';
import { UserManagementDeleteDialogComponent } from '../../admin/user-management/delete/user-management-delete-dialog.component';

@Component({
  selector: 'jhi-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  description: Description;
  isEditMode: Observable<boolean>;
  file: FileHandle;
  fileUploaded: FileHandle;

  constructor(
    private editModeService: EditModeService,
    private modalService: NgbModal,
    private variableService: VariableService,
    private fileService: FileService,
    private dataUtil: DataUtils
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.editModeService.isEditMode$;
    this.intPhotoDescription();
    this.initVariableDescription();
  }

  initVariableDescription(): void {
    forkJoin([
      this.variableService.getVariable(VariableComponentEnum.TITRE_GAUCHE),
      this.variableService.getVariable(VariableComponentEnum.TITRE_DROIT),
      this.variableService.getVariable(VariableComponentEnum.PARAGRAPHE_GAUCHE),
      this.variableService.getVariable(VariableComponentEnum.PARAGRAPHE_DROIT),
    ]).subscribe(([gaucheData, droitData, pGaucheData, pDroitData]) => {
      this.description = {
        titreGauche: gaucheData.valeur,
        paragrapheGauche: pGaucheData.valeur,
        titreDroit: droitData.valeur,
        paragrapheDroit: pDroitData.valeur,
      };
    });
  }

  intPhotoDescription() {
    this.fileService.recupererPhotoDescription().subscribe(res => {
      if (res && res.length > 0) {
        const fileDto = res[0];
        this.file = this.dataUtil.fileDtoToFileHandle(fileDto);
      }
    });
  }

  onChangeDesciption(data: Description): void {
    this.updateVariablePresentation(data);
  }

  private updateVariablePresentation(data: Description): void {
    forkJoin([
      this.variableService.updateVariable({
        code: VariableComponentEnum.TITRE_GAUCHE.toString(),
        valeur: data.titreGauche,
      }),
      this.variableService.updateVariable({
        code: VariableComponentEnum.TITRE_DROIT.toString(),
        valeur: data.titreDroit,
      }),
      this.variableService.updateVariable({
        code: VariableComponentEnum.PARAGRAPHE_GAUCHE.toString(),
        valeur: data.paragrapheGauche,
      }),
      this.variableService.updateVariable({
        code: VariableComponentEnum.PARAGRAPHE_DROIT.toString(),
        valeur: data.paragrapheDroit,
      }),
    ]).subscribe(() => {
      this.initVariableDescription();
    });
  }

  private updatePhoto() {
    if (this.fileUploaded) {
      this.fileService.addImage(this.fileUploaded, 'PRESENTATION').subscribe(file => {
        this.file = this.dataUtil.fileDtoToFileHandle(file[0]);
      });
    }
  }

  onChangePhoto($event: FileHandle) {
    this.fileUploaded = $event;
    this.updatePhoto();
  }

  deleteUser(user: User): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
      }
    });
  }
}
