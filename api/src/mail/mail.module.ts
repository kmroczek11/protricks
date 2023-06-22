import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
            host: process.env.MAIL_HOST,
            port: parseInt(<string>process.env.MAIL_PORT),
            ignoreTLS: true,
            secure: true,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from: '"Protricks" <noreply@protricks.pl>',
          },
          preview: false,
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter({
              appHost: () => process.env.APP_HOST,
            }),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
