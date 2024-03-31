import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsonBoxValidator } from './json-box.validator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { tap } from 'rxjs';

@Component({
  selector: 'app-json-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './json-box.component.html',
  styleUrl: './json-box.component.scss',
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
    this.jsonBoxControl.valueChanges.pipe(
      tap((validJson: string | null) => {
        if (validJson && this.jsonBoxControl.valid) {
          this.uponChange.emit(JSON.parse(validJson));
        }
      })
    ).subscribe();
  }

  
}
