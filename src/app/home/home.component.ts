import { Component, OnInit } from '@angular/core';

import { TestCase } from '../models/test-case';
import { TestCaseService } from '../services/services';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState: boolean = false;

  showFiller = false;

  testCases!: TestCase[];

  snapshotsLinks!: string[];

  constructor(private testCaseService: TestCaseService) {}

  ngOnInit(): void {
    this.testCases = this.testCaseService.getTestCasesAll();
    this.snapshotsLinks = this.testCaseService.getSnapshotsLinksAll();
  }

  changed(ev: any, result: any) {
    console.log('radio button change event', ev.value, result);
  }
}
