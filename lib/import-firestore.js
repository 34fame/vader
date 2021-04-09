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
   {
      message: 'Enter source file name:',
      name: 'file',
      type: 'input',
      default: '/path/to/file.json',
   },
]

const startHere = async (project, file) => {
   if (!project || !file) {
      let response = await inquirer.prompt(questions)
      project = response.project
      file = response.file
   }

   clear()

   try {
      const { db } = require(`./services/firebase/${project}/init`)
      let data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
      data = JSON.parse(data)
      const collections = Object.keys(data)
      console.log('collections', collections)
      collections.map(async (c) => {
         await Promise.all(
            data[c].map(async (doc) => {
               await db.collection(c).doc(doc.id).set(doc)
            })
         )
      })
   } catch (err) {
      console.error(err)
      return false
   }
}

module.exports = function (project, file) {
   clear()
   log(
      msg(
         'This will import collection and doc data from source file and upsert the data into provided Firebase project.'
      )
   )
   log('-------------------')

   startHere(project, file)
}
