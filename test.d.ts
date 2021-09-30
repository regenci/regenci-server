interface IUser {
  id: string
  first_name: string
  last_name: string
  email_address: string
  password?: string // required only if registered with credentials
  password_salt?: string // required only if there is a password
  verification_code?: number // used to verify if the user has access to the specified email; Required if registered with credentials
  profile_picture?: string // required if registered with an oAuth provider
  provider_name?: 'google' | 'facebook' | 'twitter' // required only if  registered with a provider
  provider_name?: string // required only if  registered with a provider
  current_template?: string // specifies the current CV (resume) template that the user has selected
  used_templates?: string[] // specifies an array of resume template id's that the user used on his account
  security_logs: SecurityLog[] // specifies all the management actions happened on the account
  is_verified?: boolean //required if registered with credentials
  is_admin?: boolean // default is set to false; Used to determine whether the user has admin priority
  created_at: Date
  updated_at: Date
  resume_id?: string // specifies the id of the users resume data table
}
type SecurityLog = {
  id: string
  action_type: SecurityLogTypes
  action_ip_address: string
  action_city: string
  action_country: string
}
type SecurityLogTypes =
  | 'signin'
  | 'logout'
  | 'signup'
  | 'reset_password'
  | 'added_provider'
  | 'added_password'
  | 'forgot_password'
  | 'removed_password'
