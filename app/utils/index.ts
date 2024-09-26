import env from '#start/env'
import jwksRsa from 'jwks-rsa'
import { v4 } from 'uuid'

export const decodeAuth0Jwt = () => {
  const issuerBaseUrl = env.get('AUTH0_ISSUER_BASE_URL') // Usar AUTH0_ISSUER_BASE_URL

  const client = jwksRsa({
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`, // Ajustado para usar AUTH0_ISSUER_BASE_URL
  })

  const getKey = (header: any, callback: any) => {
    client.getSigningKey(header.kid, (err: any, key: any) => {
      if (err) {
        console.error('Error getting signing key:', err)
        return callback(err)
      }
      const signingKey = key?.getPublicKey()
      callback(null, signingKey)
    })
  }

  return { getKey }
}

// This is a module wrapper to allow us to stub uuidv4 in our tests. See https://stackoverflow.com/questions/60416854/stubbing-uuid-with-sinon
export const uuidv4 = () => {
  return v4()
}
