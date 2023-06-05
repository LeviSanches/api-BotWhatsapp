import parsePhoneNumber, {isValidPhoneNumber}  from 'libphonenumber-js';
import { create, Whatsapp, Message, SocketState } from 'venom-bot';

export type QRCode = {
    base64Qr: string,
    asciiQR: string
}

class Sender {
    private client: Whatsapp;
    private connected: boolean;
    private qr: QRCode;

    
    get isConnected() : boolean {
        return this.connected
    }

    
    get qrCode() : QRCode {
        return this.qr
    }

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string) {

        if(!isValidPhoneNumber(to, "BR")) {
            throw new Error("Esse número não é válido")
        }

        let phoneNumber = parsePhoneNumber(to, "BR")
        ?.format("E.164")
        .replace("+", "") as string

        phoneNumber = phoneNumber
        .includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`

        console.log("phoneNumber", phoneNumber)

        await this.client.sendText(phoneNumber, body)
         
    }

    private initialize() {

        const qr = (base64Qr: string, asciiQR: string) => {
            this.qr = { base64Qr, asciiQR}
         }

        const status = (statusSession: string) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession)
         }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED
            })
         }

        create("teste1", qr, status)
        .then((client) => start(client))
        .catch((error) => console.error("Ocorreu um erro ao realizar a comunicação com whatsapp web: " + error))
    }
}

export default Sender;