import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizerPage } from './finalizer.page';

describe('FinalizerPage', () => {
  let component: FinalizerPage;
  let fixture: ComponentFixture<FinalizerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
