import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemButtonComponent } from './add-item-button.component';

describe('ColumnAddButtonComponent', () => {
  let component: AddItemButtonComponent;
  let fixture: ComponentFixture<AddItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
