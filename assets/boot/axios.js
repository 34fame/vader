import axios from 'axios'

const instance = axios.create({})

instance.defaults.baseURL = process.env.API_BASEURL
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.patch['Content-Type'] = 'application/json'

instance.interceptors.response.use(
   function (response) {
      const color = 'color: #0066FF;'
      console.info('%c axios response interceptor - start', 'color: #9900FF;')
      console.info(
         `%c ${response.config.method} ${response.config.url} ${response.status}`,
         color
      )
      if (response.data) {
         if (typeof response.data === 'object') {
            if (Array.isArray(response.data)) {
               console.info(`%c response length (array): ${response.data.length}`, color)
            } else {
               console.info(
                  `%c ${JSON.stringify(response.data).substring(0, 100)}...`,
                  color
               )
            }
         } else {
            console.info(`%c ${response.data}`, color)
         }
      } else {
         console.info('%c no data', color)
      }
      console.info('%c axios response interceptor - end', 'color: #6B00B2;')
      return response
   },
   function (error) {
      const color = 'color: #D90057;'
      console.info('%c axios response interceptor', color)
      if (error.response) {
         console.info(
            `%c ${error.response.config.method} ${error.response.config.url} ${error.response.status}`,
            color
         )
         if (error.response.data) {
            if (typeof error.response.data === 'object') {
               if (Array.isArray(error.response.data)) {
                  console.info(
                     `%c response length (array): ${error.response.data.length}`,
                     color
                  )
               } else {
                  console.info(
                     `%c ${JSON.stringify(error.response.data).substring(0, 100)}...`,
                     color
                  )
               }
            } else {
               console.info(`%c ${error.response.data}`, color)
            }
         } else {
            console.info('%c no data', color)
         }
      } else if (error.request) {
         console.info(`%c No response`, color)
         console.info(`%c ${Object.keys(error.request)}`, color)
         if (error.request.data) {
            if (typeof error.request.data === 'object') {
               if (Array.isArray(error.request.data)) {
                  console.info(
                     `%c request length (array): ${error.request.data.length}`,
                     color
                  )
               } else {
                  console.info(
                     `%c ${JSON.stringify(error.request.data).substring(0, 100)}...`,
                     color
                  )
               }
            } else {
               console.info(`%c ${error.request.data}`, color)
            }
         } else {
            console.info('%c no data', color)
         }
      } else {
         console.info(`%c No response or request`, color)
         console.info(`%c ${error.message}`, color)
      }
      return Promise.reject(error)
   }
)

export { instance }
