export interface IEmailSendPacket {
  from: string
  to: string
  templateId: string
  dynamicTemplateData: {
    main_verification_code: number
    current_year: Date
  }
}
