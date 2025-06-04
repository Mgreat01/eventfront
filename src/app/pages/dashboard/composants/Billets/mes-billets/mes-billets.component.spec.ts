import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBilletsComponent } from './mes-billets.component';

describe('MesBilletsComponent', () => {
  let component: MesBilletsComponent;
  let fixture: ComponentFixture<MesBilletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesBilletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBilletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
