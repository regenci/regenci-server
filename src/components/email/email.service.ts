import sgMail from '@sendgrid/mail'
import { ConfigService } from '@nestjs/config'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get('email.sendGridApiKey')
    sgMail.setApiKey(apiKey)
  }

  async send(packet: sgMail.MailDataRequired): Promise<boolean | HttpException> {
    try {
      const response = await sgMail.send({ ...packet })
      if (!response) throw new HttpException('Could not send the email', HttpStatus.CONFLICT)
      return true
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
