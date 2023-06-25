import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoObrasPage } from './info-obras.page';

describe('InfoObrasPage', () => {
  let component: InfoObrasPage;
  let fixture: ComponentFixture<InfoObrasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoObrasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoObrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
