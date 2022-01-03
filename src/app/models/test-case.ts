import { DigitalFormatTypeEnum, ResultEnum } from './enums';
import { FileType, LogLevel } from './types';

export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  outcome: string;
  result: ResultEnum;
  screenshots: Screenshot[];
}
export interface Screenshot {
  id?: number;
  title: string;
  link: string;
  type: DigitalFormatTypeEnum;
  dataUrl?: string;
}
export interface DialogData {
  list: Screenshot[];
  pointer: number;
}
export interface FileSelectOption {
  value: string;
  viewValue: string;
  selected?: boolean;
}

export interface Log {
  code: number;
  level: LogLevel;
  date: string;
  message: string;
}

export class TestCasesFileBox {
  // uploadedAt?: Date | undefined;
  public uploadedAtFormatted?: string;
  constructor(
    public filename: string,
    public content: string,
    public size: number,
    public type: FileType,
    public uploadedAt: number
  ) {
    this.filename = filename;
    this.content = content;
    this.type = type;
    this.uploadedAt = uploadedAt;
    this.size = size;
    if (this.uploadedAt) {
      this.createDateString(this.uploadedAt as number);
    }
  }

  private createDateString(date: number) {
    const d = new Date();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = monthNames[monthIndex];
    const year = d.getFullYear();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    this.uploadedAtFormatted = `${year}-${monthName}-${day} ${hour}:${minutes}:${seconds}`;
  }

  updateText(text: string) {
    this.content = text;
  }
  getUploadedDate() {
    return this.uploadedAtFormatted;
  }
}
