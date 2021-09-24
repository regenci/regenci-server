import { LogActionTypes } from '.prisma/client'
import geoip from 'geoip-lite'
import { sign } from 'jsonwebtoken'

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

export const IPGeolocator = async (
  ip: string
): Promise<{
  country: string
  city: string
  timezone: string
}> => {
  const { country, city, timezone } = geoip.lookup(ip)
  return { country, city, timezone }
}

export const UserLogCreator = async (type: LogActionTypes, ip: string) => {
  const { city, country } = await IPGeolocator(ip)
  return {
    action_city: city,
    action_type: type,
    action_ip_address: ip,
    action_date: new Date(),
    action_country: country,
  }
}
