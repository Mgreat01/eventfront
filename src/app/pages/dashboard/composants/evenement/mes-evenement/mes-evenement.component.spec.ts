import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEvenementComponent } from './mes-evenement.component';

describe('MesEvenementComponent', () => {
  let component: MesEvenementComponent;
  let fixture: ComponentFixture<MesEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesEvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
