import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalfotoobraPage } from './modalfotoobra.page';

describe('ModalfotoobraPage', () => {
  let component: ModalfotoobraPage;
  let fixture: ComponentFixture<ModalfotoobraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfotoobraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalfotoobraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
