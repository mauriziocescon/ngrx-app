import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBlockComponent } from './generic-block.component';

describe('GenericBlockComponent', () => {
  let component: GenericBlockComponent;
  let fixture: ComponentFixture<GenericBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
