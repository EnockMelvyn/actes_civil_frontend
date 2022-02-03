import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDecesComponent } from './form-deces.component';

describe('FormDecesComponent', () => {
  let component: FormDecesComponent;
  let fixture: ComponentFixture<FormDecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
