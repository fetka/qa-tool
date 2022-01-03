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
      const log1: Log = {
        code: 1000,
        level: 'info',
        date: new Date().toLocaleString(),
        message: 'message',
      };
      const log2: Log = {
        code: 1000,
        level: 'error',
        date: new Date().toLocaleString(),
        message: 'message',
      };
      this.logs = [log1, log2];
    }
  }

  addLog(log: Log): void {
    this.logs.push(log);
    this.saveLog();
  }

  getLogs(): Log[] {
    return this.logs;
  }

  deleteAll() {
    localStorage.removeItem(this.repoName);
  }

  private saveLog() {
    localStorage.setItem(this.repoName, JSON.stringify(this.logs));
  }
}
