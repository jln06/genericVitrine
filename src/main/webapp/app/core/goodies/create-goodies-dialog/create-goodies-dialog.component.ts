import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FileHandle } from '../../../entities/model/file-handle.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-create-goodies-dialog',
  templateUrl: './create-goodies-dialog.component.html',
  styleUrls: ['./create-goodies-dialog.component.scss'],
})
export class CreateGoodiesDialogComponent implements OnInit, AfterViewInit {
  @Input()
  filesHandle: FileHandle;
  editGoodiesMode: boolean;

  goodieFormGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.filesHandle) {
      this.editGoodiesMode = true;
      this.goodieFormGroup.patchValue({ description: this.filesHandle.description, prix: this.filesHandle.prix });
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  onUpload($event: FileHandle[]) {
    this.filesHandle = $event[0];
  }

  initForm() {
    this.goodieFormGroup = this.fb.group({
      description: ['', Validators.required],
      prix: ['', Validators.required],
    });
  }

  onSave() {
    this.goodieFormGroup.markAllAsTouched();
    this.activeModal.close({
      id: this.filesHandle.id,
      image: this.filesHandle,
      description: this.description.value,
      prix: this.prix.value,
    });
  }

  onClose() {
    this.activeModal.dismiss(false);
  }

  get description(): AbstractControl | null {
    return this.goodieFormGroup.get('description');
  }

  get prix(): AbstractControl | null {
    return this.goodieFormGroup.get('prix');
  }
}
