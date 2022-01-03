import { Component, OnInit } from '@angular/core';
import { Log } from '../models/test-case';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss'],
})
export class LogViewComponent {
  logs!: Log[];
  logView: string[] = [];

  constructor(private logService: LoggingService) {
    this.getLogs();
  }
  getLogs() {
    this.logs = this.logService.getLogs();
    if (this.logs.length > 0) {
      this.logs.forEach((log) => {
        const line: string =
          log.date +
          ' :: ' +
          log.code +
          ' :: ' +
          log.level +
          ' :: ' +
          log.message;
        this.logView.push(line);
      });
    }
  }
  deleteLogs() {
    this.logView.length = 0;
    this.logService.deleteAll();
  }
}
