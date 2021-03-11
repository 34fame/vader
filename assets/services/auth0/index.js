import { auth0spa as auth0 } from 'boot/auth0'

export async function login() {
   try {
      let result = await auth0.loginWithRedirect()
      return
   } catch (err) {
      console.error('login', err)
      return false
   }
}

export function logout() {
    auth0.logout({
      returnTo: process.env.AUTH0_LOGOUT,
    })
}

export async function handleRedirectCallback() {
   try {
      let tokens = await auth0.handleRedirectCallback()
      return tokens
   } catch (err) {
      console.error('tokehandleRedirectCallbackns', err.message)
      return false
   }
}

export async function profile() {
  const profile = await auth0.getUser()
  return profile
}

export async function getAccessToken() {
   let token = await auth0.getTokenSilently()
   return token
}