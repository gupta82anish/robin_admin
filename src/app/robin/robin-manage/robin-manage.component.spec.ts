import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobinManageComponent } from './robin-manage.component';

describe('RobinManageComponent', () => {
  let component: RobinManageComponent;
  let fixture: ComponentFixture<RobinManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobinManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobinManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
