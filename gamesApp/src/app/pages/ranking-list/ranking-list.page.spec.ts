import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingListPage } from './ranking-list.page';

describe('RankingListPage', () => {
  let component: RankingListPage;
  let fixture: ComponentFixture<RankingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
