import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Nowe hasło',
      template: './forgotPassword',
      context: {
        password,
      },
    });
  }

  async sendMessage(
    to: string,
    subject: string,
    message: string,
    sender: string,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: './message',
      context: {
        message,
        sender,
      },
    });
  }

  async sendFirstTimeMessage(to: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'GOTOWI NA PIERWSZE ZAJĘCIA?',
      template: './firstTime',
    });
  }

  async sendStayMessage(to: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'CZY CHCESZ DO NAS DOŁĄCZYĆ?',
      template: './traineeDecision',
    });
  }
}
