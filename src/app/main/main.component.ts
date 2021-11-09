import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  public zipcodes: string[];
  public refreshSubject: BehaviorSubject<boolean>;
  public subscription: Subscription;

  constructor() {
    this.subscription = new Subscription();
    this.refreshSubject = new BehaviorSubject(true);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.refreshSubject.subscribe((needRefresh) => {
        if (needRefresh) {
          this.zipcodes = JSON.parse(
            window.localStorage.getItem('zipcodes') || '[]'
          );
          this.refreshSubject.next(false);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
