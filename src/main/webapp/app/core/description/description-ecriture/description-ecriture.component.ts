import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Description } from '../../../entities/model/description.model';
import { FileHandle } from '../../../entities/model/file-handle.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditModeService } from '../../service/edit-mode.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DataUtils } from '../../util/data-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { scrollTo } from '../../util/viewUtil';

@Component({
  selector: 'jhi-description-ecriture',
  templateUrl: './description-ecriture.component.html',
  styleUrls: ['./description-ecriture.component.scss'],
})
export class DescriptionEcritureComponent implements OnInit, AfterViewInit, OnChanges {
  _description: Description | undefined;
  @Output()
  formChange = new EventEmitter();
  @Output()
  photoChange: EventEmitter<FileHandle> = new EventEmitter();

  @Input()
  set description(description: Description) {
    if (description) {
      this._description = { ...description };
      this.formDescription.patchValue(this._description);
    }
  }

  @Input()
  file: FileHandle;
  fileActuelle: FileHandle;

  photoIsChanged: boolean = false;

  ckeConfig: any;

  Editor = DecoupledEditor;
  Editor2 = DecoupledEditor;
  formDescription: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editModeService: EditModeService,
    private dataUtils: DataUtils,
    private modalService: NgbModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.patchValues();
  }

  onReady(editor: any): void {
    editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }

  buildForm(): void {
    this.formDescription = this.fb.group({
      titreGauche: ['', Validators.required],
      paragrapheGauche: ['', Validators.required],
      titreDroit: ['', Validators.required],
      paragrapheDroit: ['', Validators.required],
    });
  }

  reset(): void {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText =
      'Êtes-vous sûr(e) de vouloir annuler la partie description ? Toute modification sera perdue.';
    ngbModalRef.result.then(result => {
      this.patchValues();
    });
  }

  patchValues(): void {
    if (this._description !== undefined) {
      this.formDescription.patchValue(this._description);
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.ckeConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'insertTable',
          '|',
          'undo',
          'redo',
          'imageUpload',
          ' classicEditor',
          'blockQuote',
          'list',
          'mediaEmbed',
          'pasteFromOffice',
          'fontFamily',
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
        ],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
    };
  }

  ngAfterViewInit(): void {
    this.patchValues();
  }

  onSubmit(): void {
    // eslint-disable-next-line no-console
    this.formChange.emit(this.formDescription.value);
    if (this.photoIsChanged) {
      this.photoChange.emit(this.file);
    }
    this.photoIsChanged = false;
  }

  onFileUploaded($event: FileHandle[]): void {
    this.file = $event[0];
    this.photoIsChanged = true;
  }

  fileDropped($event: File): void {
    this.file = this.dataUtils.fileToFileHandle($event);
  }

  open() {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText = 'Etes vous sur de vouloir sauvegarder la partie présentation ?';
    ngbModalRef.result
      .then(
        result => {
          this.onSubmit();
        },
        reason => {}
      )
      .finally(() => scrollTo('presentation'));
  }
}
