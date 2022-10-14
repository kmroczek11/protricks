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
            secure: false,
            ignoreTLS: true, // add this
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
          },
          defaults: {
            from: '"Protricks" <noreply@protricks.pl>',
          },
          preview: true,
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(
              {
                appHost: () => process.env.APP_HOST,
              },
            ),
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
export class MailModule {}
