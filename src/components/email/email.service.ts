import * as sgMail from '@sendgrid/mail'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {
    const apiKey = config.get('email.sendGridApiKey')
    sgMail.setApiKey(apiKey)
  }

  async send(message: sgMail.MailDataRequired): Promise<void> {
    // if (this.config.get('env') === 'production' || this.config.get('email.shouldSendInDev') === true) {
    try {
      const response = await sgMail.send(message)
      delete message.text
      delete message.html
      console.log(`
          Sent email message:
            ${JSON.stringify(message, null, 2)}\n
          Email API Response:
            ${JSON.stringify(response, null, 2)}
        `)
    } catch (error) {
      console.error(error)
    }
    // } else {
    //   this.logger.log('NOT SENDING MESSAGE')
    //   this.logger.log(JSON.stringify(message, null, 2))
    // }
  }
}
