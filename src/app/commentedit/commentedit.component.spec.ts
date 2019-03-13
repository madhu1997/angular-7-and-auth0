import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenteditComponent } from './commentedit.component';

describe('CommenteditComponent', () => {
  let component: CommenteditComponent;
  let fixture: ComponentFixture<CommenteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommenteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
