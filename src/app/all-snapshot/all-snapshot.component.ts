/* eslint-disable comma-dangle */
import { TestCaseService } from '../services/services';
import { Component, OnInit } from '@angular/core';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'all-snapshot',
  templateUrl: './all-snapshot.component.html',
  styleUrls: ['./all-snapshot.component.scss'],
})
export class AllSnapshotComponent implements OnInit {
  screenshotLinks!: string[];

  videoLinks!: string[];

  showVideo: boolean = false;

  showScreenshot: boolean = false;

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const links = this.testCaseService.getSnapshotsLinksAll();
    this.screenshotLinks = links.filter(
      (link) => link.endsWith('PNG') || link.endsWith('JPG')
    );
    this.videoLinks = links.filter((link) => link.endsWith('MP4'));
  }

  openDialogWithScreenshots(id: number): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data: { screenshotLinks: this.screenshotLinks, pointer: id },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  openDialogWithVideo(id: number) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data: { screenshotLinks: this.videoLinks, pointer: id },
    });
  }

  showOnlyVideo() {
    this.showVideo = !this.showVideo;
  }

  showOnlyScreenshot() {
    this.showScreenshot = !this.showScreenshot;
  }
}
