import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveStatementComponent } from './descriptive-statement.component';

describe('DescriptiveStatementComponent', () => {
  let component: DescriptiveStatementComponent;
  let fixture: ComponentFixture<DescriptiveStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptiveStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptiveStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
