import env from '#start/env'
import jwksRsa from 'jwks-rsa'

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
