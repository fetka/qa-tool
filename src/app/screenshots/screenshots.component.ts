/* eslint-disable operator-linebreak */
import { DialogData, Screenshot } from '../models/test-case';
/* eslint-disable comma-dangle */
import { TestCaseService } from '../services/test-case.service';
import { Component, OnInit } from '@angular/core';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DigitalFormatTypeEnum } from '../models/enums';

@Component({
  selector: 'screenshots',
  templateUrl: './screenshots.component.html',
  styleUrls: ['./screenshots.component.scss'],
})
export class ScreenshotsComponent implements OnInit {
  screenshots!: Screenshot[];

  filteredScreenshots!: Screenshot[];

  screenshotsOnly!: Screenshot[];

  videosOnly!: Screenshot[];

  showVideo: boolean = true;

  showScreenshot: boolean = true;

  // toggleState: string = 'all';

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.screenshots = this.testCaseService.getScreenshotsAll();
    this.filteredScreenshots = this.screenshots;
    this.screenshotsOnly = this.filteredScreenshots.filter(
      (shots) => shots.type === DigitalFormatTypeEnum.IMAGE
    );

    this.videosOnly = this.filteredScreenshots.filter(
      (shots) => shots.type === DigitalFormatTypeEnum.VIDEO
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

  filterSelector(): void {
    let toggleState: string = 'all_default';
    if (this.showScreenshot && !this.showVideo) {
      toggleState = 'onlyScreenshot';
    } else if (this.showVideo && !this.showScreenshot) {
      toggleState = 'onlyVideo';
    }
    switch (toggleState) {
      case 'onlyVideo':
        this.filteredScreenshots = this.screenshots.filter(
          (shots) => shots.type === DigitalFormatTypeEnum.VIDEO
        );
        break;
      case 'onlyScreenshot':
        this.filteredScreenshots = this.screenshots.filter(
          (shots) => shots.type === DigitalFormatTypeEnum.IMAGE
        );
        break;
      default:
        this.filteredScreenshots = this.screenshots;
        break;
    }
  }
}
