import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddColumnButtonComponent } from './add-column-button.component';

describe('AddColumnButtonComponent', () => {
  let component: AddColumnButtonComponent;
  let fixture: ComponentFixture<AddColumnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddColumnButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddColumnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
