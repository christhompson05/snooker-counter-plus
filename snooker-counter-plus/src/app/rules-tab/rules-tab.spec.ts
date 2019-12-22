import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RulesTab } from './rules-tab';

describe('Tab2Page', () => {
  let component: RulesTab;
  let fixture: ComponentFixture<RulesTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RulesTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RulesTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
