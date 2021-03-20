import { instance as firebase, fireauth } from 'boot/firebase'

const loginWithCustomToken = async (token) => {
  return firebase.auth().signInWithCustomToken(token)
  .then((result) => {
    return result
  })
  .catch((err) => {
    console.error('firebase login', err)
    return err.message
  })
}

const logout = async () => {
  return fireauth.signOut()
  .then(() => {
    return true
  })
  .catch((err) => {
    console.error('firebase logout', err)
    return err.message
  })
}

export { loginWithCustomToken, logout }
