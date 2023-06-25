import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerDenunciaPage } from './fazer-denuncia.page';

describe('FazerDenunciaPage', () => {
  let component: FazerDenunciaPage;
  let fixture: ComponentFixture<FazerDenunciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazerDenunciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerDenunciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
