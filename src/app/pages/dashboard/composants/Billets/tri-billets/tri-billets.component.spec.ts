import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriBilletsComponent } from './tri-billets.component';

describe('TriBilletsComponent', () => {
  let component: TriBilletsComponent;
  let fixture: ComponentFixture<TriBilletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriBilletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriBilletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
