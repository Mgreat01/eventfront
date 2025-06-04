import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBilletComponent } from './card-billet.component';

describe('CardBilletComponent', () => {
  let component: CardBilletComponent;
  let fixture: ComponentFixture<CardBilletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBilletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
