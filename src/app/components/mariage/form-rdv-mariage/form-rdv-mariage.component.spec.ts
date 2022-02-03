import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRdvMariageComponent } from './form-rdv-mariage.component';

describe('FormRdvMariageComponent', () => {
  let component: FormRdvMariageComponent;
  let fixture: ComponentFixture<FormRdvMariageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRdvMariageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRdvMariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
