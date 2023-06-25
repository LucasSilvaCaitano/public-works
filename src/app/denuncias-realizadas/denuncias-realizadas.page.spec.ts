import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasRealizadasPage } from './denuncias-realizadas.page';

describe('DenunciasRealizadasPage', () => {
  let component: DenunciasRealizadasPage;
  let fixture: ComponentFixture<DenunciasRealizadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciasRealizadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciasRealizadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
