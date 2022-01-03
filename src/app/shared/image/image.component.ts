/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DigitalFormatTypeEnum, DirectionEnum } from 'src/app/models/enums';

import { Screenshot } from '../../models/test-case';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  host: { '(document:keyup)': 'nextImage($event)' },
})
export class ImageComponent {
  @Input('screenshot') screenshot: Screenshot = {
    title: '',
    link: '../../assets/screenshots/AUTT1857.MP4',
    type: DigitalFormatTypeEnum.VIDEO,
  };

  @Input('muted') muted: string = 'muted';

  @Input('controls') controls: string = '';

  @Input('autoplay') autoplay: string = '';

  @Input('copyButtonDisplayed') copyButtonDisplayed: boolean = false;

  @Output('flowDirection') flowDirection = new EventEmitter();

  copiedUrl!: string;

  constructor(private _snackBar: MatSnackBar) {}

  nextImage(event: any) {
    // console.log(event);
    if (event.key === 'ArrowLeft') {
      this.flowDirection.emit(DirectionEnum.LEFT);
    }
    if (event.key === 'ArrowRight') {
      this.flowDirection.emit(DirectionEnum.RIGHT);
    }
  }

  copyTitle(text: string): void {
    navigator.clipboard.writeText(text);
    const msg = 'Copied to clipboard!!! 🍕';
    this._snackBar.open(msg, '', {
      duration: 2500,
      // panelClass: ['example-pizza-party'],
    });
    this.copiedUrl = msg;
    // this._snackBar.openFromComponent(SnackBarComponent, {
    //   duration: 2 * 1000,
    //   announcementMessage: msg,
    // });
  }
}
