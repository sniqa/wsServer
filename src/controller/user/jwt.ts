import pkg from 'jsonwebtoken'

const { verify, decode, sign } = pkg

const secert = '1291767241'

export const jwtSign = (payload: { account: string }) => sign(payload, secert)

export const jwtVerify = (token: string) => verify(token, secert) as pkg.JwtPayload

const jwtDecode = (token: string) => decode(token)
