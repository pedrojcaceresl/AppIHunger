import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContinuarFinalizarModalPage } from './continuar-finalizar-modal.page';

describe('ContinuarFinalizarModalPage', () => {
  let component: ContinuarFinalizarModalPage;
  let fixture: ComponentFixture<ContinuarFinalizarModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinuarFinalizarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContinuarFinalizarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
