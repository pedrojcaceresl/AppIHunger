import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuListadoPage } from './menu-listado.page';

describe('MenuListadoPage', () => {
  let component: MenuListadoPage;
  let fixture: ComponentFixture<MenuListadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
