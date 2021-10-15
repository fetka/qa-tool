/* eslint-disable operator-linebreak */
import { DialogData, MediaType, Screenshot } from '../models/test-case';
/* eslint-disable comma-dangle */
import { TestCaseService } from '../services/services';
import { Component, OnInit } from '@angular/core';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'screenshots',
  templateUrl: './screenshots.component.html',
  styleUrls: ['./screenshots.component.scss'],
})
export class ScreenshotsComponent implements OnInit {
  screenshotsOnly!: Screenshot[];

  filteredScreenshots!: Screenshot[];

  screenshots!: Screenshot[];

  videosOnly!: Screenshot[];

  showVideo: boolean = false;

  showScreenshot: boolean = false;

  toggleState: string = 'all';

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.screenshots = this.testCaseService.getScreenshotsAll();
    this.filteredScreenshots = this.screenshots;
    this.screenshotsOnly = this.filteredScreenshots.filter(
      (shots) => shots.type === MediaType.IMAGE
    );

    this.videosOnly = this.filteredScreenshots.filter(
      (shots) => shots.type === MediaType.VIDEO
    );
  }

  openDialogWithScreenshots(id: number): void {
    const data: DialogData = { list: this.filteredScreenshots, pointer: id };
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  showOnlyVideo() {
    this.showVideo = !this.showVideo;
    this.filterSelector();
  }

  showOnlyScreenshot() {
    this.showScreenshot = !this.showScreenshot;
    this.filterSelector();
  }

  filterSelector() {
    if (
      (this.showVideo && this.showScreenshot) ||
      (!this.showVideo && !this.showScreenshot)
    ) {
      this.toggleState = 'all';
    } else if (!this.showVideo && this.showScreenshot) {
      this.toggleState = 'onlyScreenshot';
    } else {
      this.toggleState = 'onlyVideo';
    }
    switch (this.toggleState) {
      case 'all':
        this.filteredScreenshots = this.screenshots;
        break;
      case 'onlyVideo':
        this.filteredScreenshots = this.screenshots.filter(
          (shots) => shots.type === MediaType.VIDEO
        );
        break;
      case 'onlyScreenshot':
        this.filteredScreenshots = this.screenshots.filter(
          (shots) => shots.type === MediaType.IMAGE
        );
        break;
      default:
        break;
    }
  }
}
