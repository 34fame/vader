const chalk = require('chalk')

const INFO = 'blackBright'
const SUCCESS = 'greenBright'
const ERROR = 'redBright'
const COMPLETE = 'yellowBright'

const handleDocCollections = async (ref) => {
   return new Promise(async (resolve, reject) => {
      try {
         await ref
            .listCollections()
            .then(async (collections) => {
               await Promise.all(
                  collections.map(async (collection) => {
                     const collectionId = collection['_queryOptions'].collectionId
                     console.log(chalk[INFO](`Found collection ${collectionId}...`))
                     const collectionRef = ref.collection(collectionId)
                     await handleDocs(collectionRef)
                  })
               )
            })
            .then(() => {
               console.log(chalk[INFO](`Finished iterating collections...`))
               resolve()
            })
            .catch((err) => {
               console.log(chalk[ERROR]('Error inside handleDocCollections collection iterator', err))
               reject()
            })
      } catch (err) {
         console.log(chalk[ERROR]('Error during handleDocCollections', err))
         reject()
      }
   })
}

const getDocs = async (ref) => {
   return new Promise(async (resolve, reject) => {
      try {
         const snapshot = await ref.get()
         console.log(`Found ${snapshot.size} documents...`)
         if (snapshot.empty) {
            resolve()
         }

         let ids = []
         await Promise.all(
            snapshot.docs.map(async (doc) => {
               ids.push(doc.id)
            })
         )
         resolve(ids)
      } catch (err) {
         console.error('handleDocs', 'try', err)
         reject()
      }
   })
}

const handleDocs = async (ref) => {
   return new Promise(async (resolve, reject) => {
      try {
         const snapshot = await ref.get()
         console.log(`Found ${snapshot.size} documents...`)
         if (snapshot.empty) {
            resolve()
         }

         await Promise.all(
            snapshot.docs.map(async (doc) => {
               console.log(chalk.blueBright(`Found document ${doc.ref.path}...`))
               await handleDocCollections(doc.ref)
               await doc.ref.delete()
               console.log(chalk[SUCCESS](`Deleted ${doc.ref.path}...`))
            })
         )
         resolve()
      } catch (err) {
         console.error('handleDocs', 'try', err)
         reject()
      }
   })
}

const handleCollections = async (ref) => {
   return new Promise(async (resolve, reject) => {
      try {
         await ref
            .listCollections()
            .then(async (collections) => {
               await Promise.all(
                  collections.map(async (collection) => {
                     const collectionId = collection['_queryOptions'].collectionId
                     console.log(chalk[INFO](`Found collection ${collectionId}...`))
                     const collectionRef = ref.collection(collectionId)
                     await handleDocs(collectionRef)
                     console.log(chalk[INFO](`Finished collection ${collectionId}...`))
                  })
               )
            })
            .then(() => {
               console.log(chalk[INFO](`Finished iterating collections...`))
               resolve()
            })
            .catch((err) => {
               console.error('handleCollections', 'listCollections', err)
               reject()
            })
      } catch (err) {
         chalk[ERROR]
         console.log(chalk[ERROR]('Error during handleCollections', err))
         reject()
      }
   })
}

exports.clear = async (project) => {
   console.log(chalk[INFO](`Clearing all documents in project ${project}...`))
   return new Promise(async (resolve, reject) => {
      try {
         const fb = require(`./${project}/init`)
         await handleCollections(fb.db)
         resolve()
      } catch (err) {
         console.log(chalk[ERROR]('Error during clear process', err))
         reject()
      } finally {
         console.log(chalk[COMPLETE](`Completed clear process for ${project} project...`))
      }
   })
}

const handleCreateCollection = async ({ ref, collection, collectionId, data }) => {
   return new Promise(async (resolve, reject) => {
      try {
         console.log(chalk[INFO](`Creating document for ${collectionId}...`))
         ref = ref.collection(collection).doc(collectionId)
         const result = await ref.set(data)
         console.log(chalk[SUCCESS](`Created document ${collectionId}`))
         resolve()
      } catch (err) {
         console.log(chalk[ERROR](`Error during creation of ${collectionId}`, err))
         reject()
      }
   })
}

exports.load = async (project, bootstrap) => {
   console.log(chalk[INFO](`Loading bootstrap data into project ${project}...`))
   return new Promise(async (resolve, reject) => {
      try {
         const fb = require(`./${project}/init`)
         console.log(chalk[INFO](`Importing bootstrap data...`))
         const loader = require(`./${project}/${bootstrap}`)
         const load = loader()
         await Promise.all(
            Object.keys(load.collections).map(async (collection) => {
               console.log(chalk[INFO](`Loading documents into ${collection} collection...`))
               load.collections[collection].map(async (doc) => {
                  const { id, ...data } = doc
                  const payload = {
                     ref: fb.db,
                     collection,
                     collectionId: id,
                     data,
                  }
                  await handleCreateCollection(payload)
                  console.log(chalk[INFO](`Finished loading ${project} documents...`))
               })
            })
         )
         console.log(chalk[INFO](`Finished loading documents...`))
         resolve()
      } catch (err) {
         console.log(chalk[ERROR]('Error during load process', err))
         reject()
      } finally {
         console.log(chalk[COMPLETE](`Completed loading process...`))
      }
   })
}

exports.query = async (project, collection, where) => {
   console.log(chalk[INFO](`Starting query process for ${project}...`))
   return new Promise(async (resolve, reject) => {
      try {
         const fb = require(`./${project}/init`)
         console.log(chalk[INFO](`Running query...`))
         let ref = fb.db.collection(collection)
         if (where) ref = ref.where(where[0], where[1], where[2])
         const docs = await getDocs(ref)
         console.log(chalk[INFO](`Finished query...`))
         resolve(docs ? docs : [])
      } catch (err) {
         console.log(chalk[ERROR]('Error during query process', err))
         reject()
      } finally {
         console.log(chalk[COMPLETE](`Completed query process...`))
      }
   })
}
