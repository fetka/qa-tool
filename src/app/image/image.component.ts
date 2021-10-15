/* eslint-disable object-curly-newline */
import { Screenshot, Direction, MediaType } from '../models/test-case';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

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
    console.log(text);
  }
}
