import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from './../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3a08a189ff4fde",
    pass: "ec056c935ac4bc",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body}: SendMailData){
      await transport.sendMail({
        from: "Equipe Dev <quipedev@dev.com.br>",
        to: "Gislaine Costa <devgislainecosta@gmail.com>",
        subject,
        html: body
      });
    }
}
