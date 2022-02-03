import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNaissancesValideComponent } from './list-naissances-valide.component';

describe('ListNaissancesValideComponent', () => {
  let component: ListNaissancesValideComponent;
  let fixture: ComponentFixture<ListNaissancesValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNaissancesValideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNaissancesValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
