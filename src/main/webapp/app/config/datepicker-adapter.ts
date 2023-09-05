/**
 * Angular bootstrap Date adapter
 */
import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import dayjs from 'dayjs/esm';

@Injectable()
export class NgbDateDayjsAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? `${date.day.toString().padStart(2, '0')}/${date.month.toString().padStart(2, '0')}/${date.year}` : null;
  }
}
