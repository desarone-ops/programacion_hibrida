import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageQuotesPage } from './manage-quotes.page';

describe('ManageQuotesPage', () => {
  let component: ManageQuotesPage;
  let fixture: ComponentFixture<ManageQuotesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
