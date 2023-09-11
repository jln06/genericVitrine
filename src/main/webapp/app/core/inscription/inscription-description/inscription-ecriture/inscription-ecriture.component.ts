import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InscriptionDescription } from '../../../../entities/model/inscription-description.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { scrollTo } from '../../../util/viewUtil';
import { EditModeService } from '../../../service/edit-mode.service';
import { Description } from '../../../../entities/model/description.model';

@Component({
  selector: 'jhi-inscription-ecriture',
  templateUrl: './inscription-ecriture.component.html',
  styleUrls: ['./inscription-ecriture.component.scss'],
})
export class InscriptionEcritureComponent implements OnInit {
  @Input()
  _inscriptionDescription: InscriptionDescription;
  @Output()
  formChange = new EventEmitter();

  @Input()
  set inscriptionDescription(inscriptionDescription: InscriptionDescription) {
    if (inscriptionDescription) {
      this._inscriptionDescription = { ...inscriptionDescription };
      this.inscriptionDescriptionForm.patchValue(this._inscriptionDescription);
    }
  }

  Editor = DecoupledEditor;
  inscriptionDescriptionForm: FormGroup;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private editModeService: EditModeService) {}

  buildForm(): void {
    this.inscriptionDescriptionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onReady(editor: any): void {
    editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }
  reset(): void {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText =
      'Êtes-vous sûr(e) de vouloir annuler la partie inscription ? Toute modification sera perdue.';
    ngbModalRef.result.then(result => {
      if (this._inscriptionDescription !== undefined) {
        this.inscriptionDescriptionForm.patchValue(this._inscriptionDescription);
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    // eslint-disable-next-line no-console
    this.formChange.emit(this.inscriptionDescriptionForm.value);
  }

  open() {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText = 'Etes vous sur de vouloir sauvegarder la partie inscription ?';
    ngbModalRef.result
      .then(result => {
        this.onSubmit();
      })
      .finally(() => scrollTo('inscription'));
  }
}
