import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayTab } from './play-tab';

describe('Tab1Page', () => {
  let component: PlayTab;
  let fixture: ComponentFixture<PlayTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
