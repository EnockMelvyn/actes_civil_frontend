import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMariageComponent } from './list-mariage.component';

describe('ListMariageComponent', () => {
  let component: ListMariageComponent;
  let fixture: ComponentFixture<ListMariageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMariageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
