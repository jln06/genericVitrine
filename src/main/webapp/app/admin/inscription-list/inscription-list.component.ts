import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { InscriptionService } from '../../shared/service/inscription.service';
import { Saison } from '../../entities/model/saison.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscription } from '../../entities/model/inscription.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { formatDateToyyyyMMdd } from '../../core/util/dateUtils';

@Component({
  selector: 'jhi-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.scss'],
})
export class InscriptionListComponent implements OnInit, AfterViewInit, OnDestroy {
  saisonSelected: string;
  saisonList: Saison[];
  inscriptions$: Observable<Inscription[]>;
  showTable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  inscription: Inscription[];
  ColumnMode = ColumnMode;

  rows: any = [];

  constructor(private inscriptionService: InscriptionService, private readonly chRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.inscriptions$ = this.inscriptionService.inscriptionsSuject$;
    this.inscriptionService.getSaisons().subscribe(data => {
      if (data && data.length > 0) {
        this.saisonList = data;
        this.saisonSelected = data.filter(s => s.active).map(s => s.annees)[0];
        this.inscriptionService.searchInscriptions(this.saisonSelected);
        this.inscriptions$.subscribe(data => this.showTable.next(!!data));
      }
    });
  }
  downloadExcel() {
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

  onSelectChange($event: any) {
    this.inscriptionService.searchInscriptions($event);
  }

  onChangePaye(number: number) {
    this.inscriptionService.payeInscription(number).subscribe(() => this.inscriptionService.searchInscriptions(this.saisonSelected));
  }

  onSort($event: any) {
    console.log($event);
  }
}
