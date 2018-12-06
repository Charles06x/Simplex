import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMatrixComponent } from './input-matrix.component';

describe('InputMatrixComponent', () => {
  let component: InputMatrixComponent;
  let fixture: ComponentFixture<InputMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
