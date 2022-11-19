export class Pedido{
    id:number;
    clienteId:number;
    fecha: Date;
    comprobanteId: number;
    totalParcial: number;
    iva: number;
    totalGeneral: number;
    estado: number;
    gpsX: string;
    gpsY: string;
}