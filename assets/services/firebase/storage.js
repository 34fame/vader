import { storage } from 'boot/firebase'

const csUploadUrl = async (file) => {
   try {
      const options = {
         version: 'v4',
         action: 'write',
         expires: Date.now() + 15 * 60 * 1000,
         contentType: 'application/octet-stream'
      }
      const url = await storage.bucket().file(file).getSignedUrl(options)
      return url[0]
   } catch (err) {
      console.error('csUploadUrl', err.message)
      return false
   }
}

const csDownload = () => {}

const csList = async () => {
   let storageRef = storage.ref()
   return storageRef.listAll()
   .then((res) => {
      return res.items
   })
   .catch((err) => {
      console.error('csList', err)
      return []
   })
}

const csDelete = () => {}

export { csUploadUrl, csDownload, csList, csDelete }
