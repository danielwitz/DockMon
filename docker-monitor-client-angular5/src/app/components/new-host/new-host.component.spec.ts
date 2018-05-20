import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHostComponent } from './new-host.component';

describe('NewHostComponent', () => {
  let component: NewHostComponent;
  let fixture: ComponentFixture<NewHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createHost', () => {
    expect(component).toBeTruthy();
  });
});
