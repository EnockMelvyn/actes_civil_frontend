import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaissanceReportComponent } from './naissance-report.component';

describe('NaissanceReportComponent', () => {
  let component: NaissanceReportComponent;
  let fixture: ComponentFixture<NaissanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaissanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaissanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
