import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpreviewfotoPage } from './modalpreviewfoto.page';

describe('ModalpreviewfotoPage', () => {
  let component: ModalpreviewfotoPage;
  let fixture: ComponentFixture<ModalpreviewfotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpreviewfotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpreviewfotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
