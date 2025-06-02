import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEveneemntComponent } from './card-eveneemnt.component';

describe('CardEveneemntComponent', () => {
  let component: CardEveneemntComponent;
  let fixture: ComponentFixture<CardEveneemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEveneemntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEveneemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
