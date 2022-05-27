import { ModalController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-continuar-finalizar-modal',
  templateUrl: './continuar-finalizar-modal.page.html',
  styleUrls: ['./continuar-finalizar-modal.page.scss'],
})
export class ContinuarFinalizarModalPage implements OnInit {

  constructor(private modalController: ModalController,   private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

 /*  dismiss() {
    this.modalController.dismiss();
  } */


  async dismiss() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure you want to discard your changes?',
      buttons: [
        {
          text: 'Discard Changes',
          role: 'destructive'
        },
        {
          text: 'Keep Editing',
          role: 'cancel'
        }
      ]
    });
    
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    
    if (role === 'destructive') {
      return true;
    }

    return false;
  }

  

}
