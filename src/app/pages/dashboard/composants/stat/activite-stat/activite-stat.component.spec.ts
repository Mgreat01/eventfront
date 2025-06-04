import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteStatComponent } from './activite-stat.component';

describe('ActiviteStatComponent', () => {
  let component: ActiviteStatComponent;
  let fixture: ComponentFixture<ActiviteStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiviteStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiviteStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
