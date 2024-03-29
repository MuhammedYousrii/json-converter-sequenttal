import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonBoxComponent } from './json-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('JsonBoxComponent', () => {
  let component: JsonBoxComponent;
  let fixture: ComponentFixture<JsonBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonBoxComponent , CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit valid JSON on box change', () => {
    spyOn(component.uponChange, 'emit');
    const validJsonString = `{ 'name': "John Doe", 'age': 30}`;
    component.jsonBoxControl.setValue(validJsonString);
    expect(component.uponChange.emit).toHaveBeenCalledWith(validJsonString);
  });

  it('should not emit invalid JSON on box change', () => {
    spyOn(component.uponChange, 'emit');
    const invalidJsonString = '{"name" "John Doe", "ag"}';
    component.jsonBoxControl.setValue(invalidJsonString);
    expect(component.uponChange.emit).not.toHaveBeenCalled();
  });
});
