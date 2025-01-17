import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsonBoxValidator } from './json-box.validator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-json-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './json-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonBoxComponent implements OnInit {
  public jsonBoxControl: FormControl<string | null> = new FormControl(
    '', 
  {
    validators: [Validators.required, jsonBoxValidator()], 
    updateOn: 'change'
  });

  public readonly errorMessages = {
    invalidJson: 'Please enter a valid JSON structure',
    required: 'Please enter a JSON to convert'
  };
  public readonly jsonBoxHint = 'Entered JSON will be validated first before proceeding';
  
  
  @Output() public uponChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  ngOnInit(): void {
   this._provideJson().subscribe();
  }



  /**
   * @private 
   * Construct an stream to validate JSON and emit the parsedValue after validation
   * 
   * @note No need to unsubscribe manually as the stream will be destroyed when the component is destroyed
   * @returns Observable<string | null>
   */
  private _provideJson(): Observable<string | null> {
    return this.jsonBoxControl.valueChanges.pipe(
      tap((validJson: string | null) => {
        if (validJson && this.jsonBoxControl.valid) {
          const parsedJson = JSON.parse(validJson);
          this.uponChange.emit(Array.isArray(parsedJson) ? parsedJson : [parsedJson]);
        }
      })
    )
  }

  
}
