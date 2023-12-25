import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBoardButtonComponent } from './add-board-button.component';

describe('AddBoardButtonComponent', () => {
  let component: AddBoardButtonComponent;
  let fixture: ComponentFixture<AddBoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
