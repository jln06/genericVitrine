import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input()
  confirmText: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  onSave() {
    this.activeModal.close(true);
  }

  onClose() {
    this.activeModal.dismiss(false);
  }
}
