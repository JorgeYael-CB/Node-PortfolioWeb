import { MailerAdapter } from "../../../config";
import { ContactByEmailDto } from "../../dtos/contact";



export class ContactByEmailUseCase {

    constructor(
        private readonly mailerAdapter: MailerAdapter,
        private readonly emailSupport: string[] | string,
    ){};


    async send( contactByEmailDto: ContactByEmailDto ) {
        const { email, fullName, message, subject, phoneNumber } = contactByEmailDto;

        await Promise.all([
            this.mailerAdapter.send({
                subject: 'Thanks for contacting me',
                to: email,
                html: `
                    <h1>DevComplete Studios</h1>
                    <p>
                        Thank you for contacting me <strong>${fullName}</strong>, I will reply as soon as possible! Remember that if you left your phone number it will be easier and faster for me to answer you.
                    </p>
                    <p>Sincerely: Jorge Yael</p>
                `
            }),
            this.mailerAdapter.send({
                subject,
                to: this.emailSupport,
                html: `
                    <h1${ subject }</h1>
                    <p>Alguien se quiere poner en contacto contigo</p>
                    <p> name: <strong>${ fullName }</strong> </p>
                    <p> email: <strong>${ email }</strong> </p>
                    <p> número de telefono: <strong>${ phoneNumber ? phoneNumber: 'No dejo su número de telefono' }</strong> </p>
                    <p> message: <strong>${ message }</strong> </p>
                `
            }),
        ]);

        return {
            contactByEmailDto,
            succes: true,
            messageSucces: `The message was sent successfully`,
        }
    }

}
