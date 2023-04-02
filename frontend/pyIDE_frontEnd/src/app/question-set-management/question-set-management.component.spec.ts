import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSetManagementComponent } from './question-set-management.component';

describe('QuestionSetManagementComponent', () => {
  let component: QuestionSetManagementComponent;
  let fixture: ComponentFixture<QuestionSetManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSetManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
