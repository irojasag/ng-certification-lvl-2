import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'zipcode-form',
  templateUrl: './zipcode-form.component.html',
  styleUrls: ['./zipcode-form.component.css'],
})
export class ZipcodeFormComponent {
  @Input('refreshSubject') public refreshSubject: BehaviorSubject<boolean>;

  public zipcodeControl = new FormControl();

  public saveZipcode(): void {
    const newZipcode = this.zipcodeControl.value;
    this.zipcodeControl.setValue('');
    if (newZipcode) {
      const currentZipcodes = JSON.parse(
        window.localStorage.getItem('zipcodes') || '[]'
      );
      currentZipcodes.push(newZipcode);

      window.localStorage.setItem(
        'zipcodes',
        JSON.stringify([...new Set(currentZipcodes)])
      );
      this.refreshSubject.next(true);
    }
  }
}
