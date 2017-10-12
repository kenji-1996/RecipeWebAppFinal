import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class DataPassService {
  private passAnySource = new Subject<any>();

  dataPassed$ = this.passAnySource.asObservable();

  addData(data: any): void {
    this.passAnySource.next(data);
  }

  constructor() { }

}
