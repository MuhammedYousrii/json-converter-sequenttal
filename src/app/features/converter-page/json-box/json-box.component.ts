import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsonBoxValidator } from './json-box.validator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-json-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './json-box.component.html',
  styleUrl: './json-box.component.scss',
})
export class JsonBoxComponent implements OnInit {
  readonly jsonBoxControl: FormControl<string> = new FormControl(
    '', 
  {
    validators: [Validators.required, jsonBoxValidator()], 
    nonNullable: true
  });

  readonly errorMessages = {
    invalidJson: 'The JSON which you have entered is an invalid JSON Structure',
    required: 'Please Enter a JSON to convert'
  }
  @Output() public uponChange: EventEmitter<string> = new EventEmitter<string>();

  
  ngOnInit(): void {
      this.jsonBoxControl.valueChanges.subscribe((validJson: string) => {
        if (this.jsonBoxControl.valid) this.uponChange.emit(validJson);
      })
  }

  
}
