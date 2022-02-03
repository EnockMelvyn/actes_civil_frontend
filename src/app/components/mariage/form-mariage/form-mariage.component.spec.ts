import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMariageComponent } from './form-mariage.component';

describe('FormMariageComponent', () => {
  let component: FormMariageComponent;
  let fixture: ComponentFixture<FormMariageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMariageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
