const inquirer = require('inquirer')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const clear = console.clear
const log = console.log

const removeAllChildNodeModules = () => {
   const prompt = {
      message: 'This action will find and remove all node_modules folders, recursively, from the current directory.  Are you sure you want to do this?',
      name: 'prompt',
      type: 'confirm',
      default: false
   }

   inquirer.prompt(prompt)
   .then(answers => {
      if (answers.prompt === false) return false

      spawn.sync('find', [
         '.', '-type', 'd', '-name', `"node_modules"`,
         '-exec', 'rm', '-rf', '{}', '+'
      ], {
         stdio: 'inherit',
         shell: true
      })
   })
}

const installAllChildNodeModules = () => {
   const prompt = {
      message: 'This action will find and install all node_modules, recursively, from the current directory.  Are you sure you want to do this?',
      name: 'prompt',
      type: 'confirm',
      default: false
   }

   inquirer.prompt(prompt)
   .then(answers => {
      if (answers.prompt === false) return false

      spawn.sync('find', [
         '.', '-type', 'f', '-name', `"package.json"`,
         '-execdir', 'yarn', '\\;'
      ], {
         stdio: 'inherit',
         shell: true
      })
   })
}

module.exports = function() {
   const prompt = {
      message: 'What would you like to do?',
      name: 'prompt',
      type: 'list',
      choices: [
         'Remove all child node_modules',
         'Install all child node_modules',
      ]
   }

   inquirer.prompt(prompt)
   .then(answers => {
      switch (answers.prompt) {
         case 'Remove all child node_modules':
            removeAllChildNodeModules()
            break
         case 'Install all child node_modules':
            installAllChildNodeModules()
            break
      }
   })
}