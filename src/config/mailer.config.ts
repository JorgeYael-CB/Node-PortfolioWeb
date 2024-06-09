import { Transporter, createTransport } from 'nodemailer';
import { CustomError } from '../domain/errors';


interface Props {
    mailerUser: string;
    mailerPass: string;
    mailerHost?:string;
    mailerPort?:number;
    secure?:boolean;
};

interface SendEmail {
    from?:string;
    to:string | string[];
    subject:string;
    text?:string;
    html:string;
    files?: File[];
}

interface File {
    content: any;
    filename:string;
};



export class MailerAdapter {

    private transporter:Transporter;
    private readonly mailerUser:string;


    constructor( config: Props ){
        const { mailerPass, mailerUser, mailerHost = 'smtp.hostinger.com', mailerPort, secure = true } = config;

        this.mailerUser = mailerUser;

        this.transporter = createTransport({
            host: mailerHost,
            secure,
            port: mailerPort,
            auth: {
                user: mailerUser,
                pass: mailerPass,
            }
        });
    };

    async send( config: SendEmail ) {
        const { from = `DevComplete Studios <${this.mailerUser}>`, html, subject, text = '', to, files } = config;

        try {
            const info = await this.transporter.sendMail({
                from,
                to,
                subject,
                text,
                html,
                attachments: files,
            });

            if( !info ){
                CustomError.InternalServerError(`No se puede enviar la informacion`, { date: new Date(), file: __dirname, message: 'Error al enviar el email!'});
            }

            return info;
        } catch (error) {
            CustomError.InternalServerError(`${error}`, { date: new Date(), file: __dirname, message: 'Error al enviar el email!', error });
        };
    };

}