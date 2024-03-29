import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonBoxComponent } from './json-box.component';

describe('JsonBoxComponent', () => {
  let component: JsonBoxComponent;
  let fixture: ComponentFixture<JsonBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
