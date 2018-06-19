import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionSelectorComponent } from './admin-question-selector.component';

describe('QuestionSelectorComponent', () => {
  let component: AdminQuestionSelectorComponent;
  let fixture: ComponentFixture<AdminQuestionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminQuestionSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuestionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
