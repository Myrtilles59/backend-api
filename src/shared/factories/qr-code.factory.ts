import {Injectable} from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeFactory {
    async generate(orderId: number): Promise<string> {
        const data = `https://myapp.com/orders/${orderId}/pickup`;
        return QRCode.toDataURL(data);
    }
}