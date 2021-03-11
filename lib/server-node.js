const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')

const quote = require('./quotes')

async function runNodeJsCreate(project) {
   try {
      const basePath = `./${project}/server`

      console.log('Cloning repo from GitHub...')
      spawn.sync(
         'gh',
         ['repo', 'clone', 'https://github.com/34fame/server-nodejs-template', 'server'],
         {
            cwd: `./${project}`,
            stdio: 'inherit',
         }
      )

      console.log('Copying bootstrap files...')
      fs.copyFileSync(`./vader/assets/.prettierrc`, `./${basePath}/.prettierrc`)
      fs.copyFileSync(`./vader/assets/.eslintrc`, `./${basePath}/.eslintrc`)
      fs.copyFileSync(`./vader/assets/jsconfig.json`, `./${basePath}/jsconfig.json`)

      file = `${basePath}/.env`
      contents = `
         NODE_ENV=dev
         PORT=3000
         MONGO_URI=mongodb+srv://dbAdmin:<password>@<host>.dfr6y.mongodb.net/<db>?retryWrites=true&w=majority
         `
      fs.writeFile(file, contents, 'utf-8', function (err, data) {
         if (err) throw err
      })

      console.log('Installing packages...')
      spawn.sync('yarn', [], {
         cwd: `./${basePath}`,
         stdio: 'inherit',
      })

      let packages = [
         'eslint',
         'eslint-config-prettier',
         'eslint-plugin-prettier',
         'prettier',
      ]

      packages.map((s) => {
         const child = spawn.sync('yarn', ['add', '-D', s], {
            cwd: `./${basePath}`,
            stdio: 'inherit',
         })
      })
   } catch (err) {
      console.error('Oops!  Problems with creating Node.js server...', err)
   }
}

module.exports = async function (project) {
   quote('other', "I'm one with the Force.  The Force is with me.")
   console.log('Installing Node.js/Express.js server...')

   await runNodeJsCreate(project)

   console.log('')
   console.log('Ok.  The Server is ready!')
   console.log('')
}
