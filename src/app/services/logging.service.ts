import { Log } from '../models/test-case';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private repoName: string = 'qa-logging';
  private logs!: Log[];

  constructor() {
    const logs = localStorage.getItem(this.repoName);
    if (logs) {
      this.logs = JSON.parse(logs) as Log[];
    } else {
      this.logs = [];
    }
  }

  addLog(log: Log): void {
    this.logs.push(log);
    this.saveLog();
  }

  getLogs(): Log[] {
    return this.logs;
  }

  private saveLog() {
    localStorage.setItem(this.repoName, JSON.stringify(this.logs));
  }
}
