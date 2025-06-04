import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriEvenementComponent } from './tri-evenement.component';

describe('TriEvenementComponent', () => {
  let component: TriEvenementComponent;
  let fixture: ComponentFixture<TriEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriEvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
