/* eslint-disable comma-dangle */
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'preview-json',
  templateUrl: './preview-json.component.html',
  styleUrls: ['./preview-json.component.scss'],
})
export class PreviewJsonComponent implements OnDestroy {
  data!: any;
  state: any;
  subscription!: Subscription;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscription = this.route.data.subscribe(
      (data) => {
        this.data = data.name;
        console.log(data);
      },
      (error) => console.log(error)
    );

    this.state = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
