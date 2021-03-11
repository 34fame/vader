import { Auth0Client } from '@auth0/auth0-spa-js'

const auth0spa = new Auth0Client({
  client_id: process.env.AUTH0_CLIENTID,
  domain: process.env.AUTH0_DOMAIN,
  redirect_uri: process.env.AUTH0_CALLBACK,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
  audience: process.env.AUTH0_AUDIENCE,
})

export { auth0spa }
