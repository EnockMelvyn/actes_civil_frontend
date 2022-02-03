import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariageReportComponent } from './mariage-report.component';

describe('MariageReportComponent', () => {
  let component: MariageReportComponent;
  let fixture: ComponentFixture<MariageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MariageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MariageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
