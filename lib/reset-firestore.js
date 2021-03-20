const chalk = require('chalk')
const inquirer = require('inquirer')
// const spawn = require('cross-spawn')

const fb = require('./services/firebase')

const clear = console.clear
const log = console.log
const msg = chalk.bold.yellowBright

const questions = [
   {
      message: 'Select Firebase project:',
      name: 'project',
      type: 'list',
      choices: ['axman-dev', 'keeperrx-dev', 'keeperrx-test', 'keeperrx'],
   },
   {
      message: 'Load bootstrap data?  (The loader file must exist in project folder.)',
      name: 'bootstrap',
      type: 'list',
      choices: ['none', 'loader1'],
   },
   {
      message: 'This will delete everything.  Are you sure?',
      name: 'confirm',
      type: 'confirm',
      default: false,
   },
]

const startHere = async () => {
   const { project, bootstrap, confirm } = await inquirer.prompt(questions)

   clear()

   if (!confirm) {
      log('Action cancelled.  No action taken.')
      return false
   }

   try {
      await fb.clear(project)
      log(`Project ${project} was successfully reset...`)
   } catch (err) {
      console.error(err)
      return false
   }

   if (bootstrap === 'none') {
      log('No bootstrap data loaded...')
      return false
   }

   try {
      await fb.load(project, bootstrap)
      log(`Project ${project} was successfully loaded...`)
   } catch (err) {}
}

module.exports = function () {
   clear()
   log(msg('This will remove all existing data and load bootstrap data.'))
   log('-------------------')

   startHere()
}
