/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import { Screenshot, Direction, MediaType } from '../models/test-case';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    type: MediaType.VIDEO,
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
      this.flowDirection.emit(Direction.LEFT);
    }
    if (event.key === 'ArrowRight') {
      this.flowDirection.emit(Direction.RIGHT);
    }
  }

  copyTitle(text: string): void {
    navigator.clipboard.writeText(text);
    const msg = `${text} is copied to clipboard!!! 🍕`;
    this._snackBar.open(msg, '', {
      duration: 2100,
      // panelClass: ['example-pizza-party'],
    });
    this.copiedUrl = msg;
    // this._snackBar.openFromComponent(SnackBarComponent, {
    //   duration: 2 * 1000,
    //   announcementMessage: msg,
    // });
  }
}
