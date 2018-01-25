import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRegistComponent } from './menu-regist.component';

describe('MenuRegistComponent', () => {
  let component: MenuRegistComponent;
  let fixture: ComponentFixture<MenuRegistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRegistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
