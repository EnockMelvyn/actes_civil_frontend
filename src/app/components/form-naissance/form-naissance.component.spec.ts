import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNaissanceComponent } from './form-naissance.component';

describe('FormNaissanceComponent', () => {
  let component: FormNaissanceComponent;
  let fixture: ComponentFixture<FormNaissanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNaissanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNaissanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
