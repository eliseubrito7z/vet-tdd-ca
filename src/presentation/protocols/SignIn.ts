import {
  api,
  AxiosHttpClient,
} from './../../infra/http/axios-http-client/axios-http-client'
import { setCookie } from 'nookies'
import { StaffReduced } from 'domain/models/StaffModel'

type credentialsProps = {
  email: string
  password: string
  rememberMe: boolean
}

export async function SignIn(credentials: credentialsProps) {
  const axios = new AxiosHttpClient()
  const url = '/auth/signin'
  const method = 'post'
  const body = {
    username: credentials.email,
    password: credentials.password,
  }

  const maxAgeValue = credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24

  await axios
    .authentication({
      url,
      method,
      body,
      headers: {
        Authorization: '',
      },
    })
    .then((response) => {
      api.defaults.headers.Authorization = `Bearer ${response.body.accessToken}`

      setCookie(undefined, 'vet.token', response.body.accessToken, {
        maxAge: maxAgeValue,
        path: '/',
      })

      setCookie(undefined, 'vet.refreshToken', response.body.refreshToken, {
        maxAge: maxAgeValue,
        path: '/',
      })
    })
    .catch((error) => {
      throw error
    })

  const { body: UserData } = await axios.request<StaffReduced>({
    url: '/api/staff/v1/me',
    method: 'get',
  })

  return UserData
}
