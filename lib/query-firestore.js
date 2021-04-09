const chalk = require('chalk')
const inquirer = require('inquirer')

const fb = require('./services/firebase')

const clear = console.clear
const log = console.log
const msg = chalk.bold.yellowBright

const questions = [
   {
      message: 'Select Firebase project:',
      name: 'project',
      type: 'list',
      choices: ['axman-dev', 'keeperrx-test', 'keeperrx'],
   },
   {
      message: 'What collection do you want to query?',
      name: 'collection',
      type: 'input',
      default: 'users',
   },
]

const startHere = async (project, collection, where) => {
   if (!project || !collection) {
      let response = await inquirer.prompt(questions)
      project = response.project
      collection = response.collection
   }

   clear()

   try {
      const docs = await fb.query(project, collection, where)
      if (docs.length) log(docs)
   } catch (err) {
      console.error(err)
      return false
   }
}

module.exports = function ({ project, collection, where }) {
   clear()
   log(
      msg(
         'This will query a firestore collection and return IDs for all documents found.'
      )
   )
   log('-------------------')

   startHere(project, collection, where)
}
