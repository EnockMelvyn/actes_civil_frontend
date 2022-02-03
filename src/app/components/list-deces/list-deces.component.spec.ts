import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDecesComponent } from './list-deces.component';

describe('ListDecesComponent', () => {
  let component: ListDecesComponent;
  let fixture: ComponentFixture<ListDecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
