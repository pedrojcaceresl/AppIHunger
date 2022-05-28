import { LocalStorageService } from './../../services/localStorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.scss']
})
export class CartPopoverComponent implements OnInit {

  constructor(
    public localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

}
