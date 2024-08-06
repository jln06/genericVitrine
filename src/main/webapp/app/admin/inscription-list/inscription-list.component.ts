import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { InscriptionService } from '../../shared/service/inscription.service';
import { Saison } from '../../entities/model/saison.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscription } from '../../entities/model/inscription.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { formatDateToyyyyMMdd } from '../../shared/util/dateUtils';
import { PieceJointeType } from '../../enums/pieceJointeType';
import * as fileSaver from 'file-saver';
import { tap } from 'rxjs/operators';
import { FileService } from '../../home/service/file.service';
import { DataUtils } from '../../shared/util/data-util.service';

@Component({
  selector: 'jhi-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.scss'],
})
export class InscriptionListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  expanded: any = {};

  saisonSelected: string;
  saisonList: Saison[];
  inscriptionObservable: Observable<Inscription[]>;
  inscriptions: BehaviorSubject<Inscription[]> = new BehaviorSubject<Inscription[]>([]);
  showTable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  inscription: Inscription[];
  ColumnMode = ColumnMode;

  rows: any = [];

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit(): void {
    this.inscriptionService.getSaisons().subscribe(data => {
      if (data.length > 0) {
        this.saisonList = data;
        this.saisonSelected = data.filter(s => s.active).map(s => s.annees)[0];
        this.loadInscriptions();
      }
    });
  }

  loadInscriptions(): void {
    this.inscriptionService
      .searchInscriptions(this.saisonSelected)
      .pipe(
        tap(inscriptions => this.inscriptions.next(inscriptions)),
        tap(inscriptions => this.showTable.next(!!inscriptions))
      )
      .subscribe();
  }

  downloadExcel(): void {
    this.inscriptionService.downloadExcel(this.saisonSelected).subscribe((blob: Blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = this.saisonSelected + '-' + formatDateToyyyyMMdd(new Date()) + '.xls';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    });
  }

  onSelectChange($event: any): void {
    this.loadInscriptions();
  }

  onChangePaye(number: number): void {
    this.inscriptionService.payeInscription(number).subscribe(() => this.loadInscriptions());
  }

  downloadFile(idPieceJointe: number): void {
    this.inscriptionService.telechargerFichier(idPieceJointe).subscribe(response => {
      const filename = this.getFilenameFromContentDisposition(response);
      const blob = new Blob([response.body], { type: response.body.type });
      fileSaver.saveAs(blob, filename);
    });
  }

  openFile(idPieceJointe: number): void {
    this.inscriptionService.telechargerFichier(idPieceJointe).subscribe(response => {
      const filename = this.getFilenameFromContentDisposition(response);
      const blob = new Blob([response.body], { type: response.body.type });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  private getFilenameFromContentDisposition(response: any): string {
    const contentDisposition = response.headers.get('Content-Disposition');
    if (!contentDisposition) {
      return 'unknown';
    }
    const [, filename] = contentDisposition.split('filename=');
    return filename ? filename.replace(/['"]/g, '') : 'unknown';
  }

  toggleExpandRow(row): void {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event): void {
    console.log('Detail Toggled', event);
  }

  getRowClass(row: any): string {
    return row.paye ? 'paid-row' : ''; // Apply 'paid-row' class if row.paye is truthy
  }

  protected readonly PieceJointeType = PieceJointeType;
}
