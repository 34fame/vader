const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')

const clear = console.clear
const log = console.log
const msg = chalk.bold.yellowBright

const questions = [
   {
      message: 'Select Firebase project:',
      name: 'project',
      type: 'list',
      choices: ['axman-dev', 'conflux-dev', 'conflux-prod', 'keeperrx-test', 'keeperrx'],
   },
]

const startHere = async (project) => {
   if (!project) {
      let response = await inquirer.prompt(questions)
      project = response.project
   }

   clear()

   try {
      const { db } = require(`./services/firebase/${project}/init`)
      let dump = {}
      const collections = await db.listCollections()
      await Promise.all(
         collections.map(async (c) => {
            let collection = c['_queryOptions'].collectionId
            console.log('collection', collection)
            let snapshot = await db.collection(collection).get()
            if (!snapshot.empty) {
               console.log(`${collection} has ${snapshot.docs.length} docs...`)
               dump[collection] = []
               snapshot.docs.map((d) => {
                  let doc = {
                     id: d.id,
                     ...d.data(),
                  }
                  dump[collection].push(doc)
               })
            }
            console.log('dump done')
         })
      )

      console.log('write to file')
      let timestamp = String(new Date().valueOf())
      fs.writeFileSync(`${project}-${timestamp}.json`, JSON.stringify(dump, null, 3))
   } catch (err) {
      console.error(err)
      return false
   }
}

module.exports = function (project) {
   clear()
   log(msg('This will export all collections and documents and save to a file.'))
   log('-------------------')

   startHere(project)
}
