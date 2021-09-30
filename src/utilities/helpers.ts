import { sign } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import IPinfoWrapper, { IPinfo } from 'node-ipinfo'
import { SecurityLogDto } from '../components/user/dto'
import { SecurityLogActionTypes } from '@prisma/client'

const config = new ConfigService()
const ipinfoWrapper = new IPinfoWrapper(config.get('api.ipApiKey'))

// This method signs a jwt token with the provided secret, data, and expire date
export const jwtSign = async (data: any, secret: string, time: string): Promise<string> => {
  const signed = sign(data, secret, {
    expiresIn: time,
  })
  return `Bearer ${signed}`
}

// This method generates a random 6 digit number
export const totGenerator = (): number => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const IPGeolocator = async (ip: string) => {
  const { city, timezone, region, country } = await ipinfoWrapper.lookupIp(ip).then((response: IPinfo) => response)
  return { country, city, timezone, region }
}

export const UserLogCreator = async (type: SecurityLogActionTypes, ip: string): Promise<SecurityLogDto> => {
  const { city, country, region } = await IPGeolocator(ip)
  return {
    action_type: type,
    action_ip_address: ip,
    action_date: new Date(),
    action_country: country,
    action_city: city ?? region,
  }
}
