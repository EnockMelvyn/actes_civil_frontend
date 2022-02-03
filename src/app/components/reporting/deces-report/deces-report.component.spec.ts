import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecesReportComponent } from './deces-report.component';

describe('DecesReportComponent', () => {
  let component: DecesReportComponent;
  let fixture: ComponentFixture<DecesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
