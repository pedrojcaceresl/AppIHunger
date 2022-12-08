import { PedidoService } from "./../services/pedido.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.page.html",
  styleUrls: ["./pedidos.page.scss"],
})
export class PedidosPage implements OnInit {
  pedido;
  detalles = new Array();
  constructor(private service: PedidoService) {}

  ngOnInit() {
    this.service.getAllByUser().subscribe((data) => {
      data.result.forEach((element) => {
        element.detalles.forEach((element2) => {
          this.detalles.push(element2);
        });
      });

      console.log(data.result);
    });
  }
}
