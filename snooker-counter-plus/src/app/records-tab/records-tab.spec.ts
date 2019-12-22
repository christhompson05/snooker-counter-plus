import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecordsTab } from './records-tab';

describe('Tab3Page', () => {
  let component: RecordsTab;
  let fixture: ComponentFixture<RecordsTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
