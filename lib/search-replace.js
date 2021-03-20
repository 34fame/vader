const chalk = require('chalk')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')

const clear = console.clear
const log = console.log

const msg = chalk.bold.yellowBright

const questions = [
      { message: 'Starting path', name: 'startPath', type: 'input', default: '.' },
      { message: 'File name pattern', name: 'filePattern', type: 'input', default: '*.js' },
      { message: 'Search for', name: 'searchFor', type: 'input' },
      { message: 'Replace with', name: 'replaceWith', type: 'input' }
]

function startHere() {
   inquirer.prompt(questions).then(answers => {
      spawn.sync('find', [
         answers.startPath,
         '-type', 'f', '-name',
         `"${answers.filePattern}"`,
         '-exec', 'sed', '-i', '-e',
         `'s/${ answers.searchFor }/${ answers.replaceWith }/g'`,
         '{}', '+'
      ], {
         stdio: 'inherit',
         shell: true,
      })
      spawn.sync('find', [
         answers.startPath,
         '-type', 'f', '-name',
         `"*-e"`,
         '-exec', 'rm', '{}', '+'
      ], {
         stdio: 'inherit',
         shell: true,
      })
   })
}

module.exports = function() {
   clear()
   log(msg('Search and Replace it is!'))
   log('-------------------')

   startHere()
}

