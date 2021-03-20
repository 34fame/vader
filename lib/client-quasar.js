const fs = require('fs')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const quote = require('./quotes')

function runQuasarInstall(project) {
   console.log(chalk.red.bold("  ALERT: Leave the Quasar project name as 'client'!!"))
   const child = spawn.sync('quasar', ['create', 'client'], {
      cwd: `./${project}`,
      stdio: 'inherit',
   })
}

function copyBootstrapFiles(project) {
   fs.copyFileSync(`./vader/assets/.prettierrc`, `./${project}/client/.prettierrc`)
   fs.copyFileSync(`./vader/assets/.eslintrc`, `./${project}/client/.eslintrc`)
   fs.copyFileSync(`./vader/assets/jsconfig.json`, `./${project}/client/jsconfig.json`)
   fs.copyFileSync(
      `./vader/assets/boot/apexcharts.js`,
      `./${project}/client/src/boot/apexcharts.js`
   )
   fs.copyFileSync(
      `./vader/assets/boot/auth0.js`,
      `./${project}/client/src/boot/auth0.js`
   )
   fs.copyFileSync(
      `./vader/assets/boot/axios.js`,
      `./${project}/client/src/boot/axios.js`
   )
   fs.copyFileSync(
      `./vader/assets/boot/firebase.js`,
      `./${project}/client/src/boot/firebase.js`
   )
   fs.copyFileSync(
      `./vader/assets/boot/loading.js`,
      `./${project}/client/src/boot/loading.js`
   )
   fs.copyFileSync(
      `./vader/assets/boot/notify.js`,
      `./${project}/client/src/boot/notify.js`
   )
   fs.copyFileSync(
      `./vader/assets/boot/storage.js`,
      `./${project}/client/src/boot/storage.js`
   )
   fs.mkdirSync(`./${project}/client/src/services`)
   fs.mkdirSync(`./${project}/client/src/services/auth0`)
   fs.mkdirSync(`./${project}/client/src/services/firebase`)
   fs.copyFileSync(
      `./vader/assets/services/auth0/index.js`,
      `./${project}/client/src/services/auth0/index.js`
   )
   fs.copyFileSync(
      `./vader/assets/services/firebase/index.js`,
      `./${project}/client/src/services/firebase/index.js`
   )
   fs.copyFileSync(
      `./vader/assets/services/firebase/auth.js`,
      `./${project}/client/src/services/firebase/auth.js`
   )
   fs.copyFileSync(
      `./vader/assets/services/firebase/firestore.js`,
      `./${project}/client/src/services/firebase/firestore.js`
   )
   fs.copyFileSync(
      `./vader/assets/services/firebase/storage.js`,
      `./${project}/client/src/services/firebase/storage.js`
   )
   fs.copyFileSync(
      `./vader/assets/store/template.js`,
      `./${project}/client/src/store/template.js`
   )
}

function updateQuasarConfig(project) {
   const confFile = `./${project}/client/quasar.conf.js`
   fs.readFile(confFile, 'utf-8', function (err, data) {
      if (err) throw err
      let updates = data
      updates = updates.replace(/vueRouterMode: 'hash'/g, "vueRouterMode: 'history'")
      updates = updates.replace(/\/\/ 'fontawesome\-v5'/g, "'fontawesome-v5'")
      updates = updates.replace(
         /'axios'/g,
         "'axios',\n\t\t'auth0',\n\t\t'apexcharts',\n\t\t'firebase',\n\t\t'loading',\n\t\t'notify',\n\t\t'storage'"
      )
      fs.writeFile(confFile, updates, 'utf-8', function (err, data) {
         if (err) throw err
      })
   })
}

async function addPlugins(project) {
   const prompt = {
      message: 'Select Plugins',
      name: 'selections',
      type: 'checkbox',
      choices: [
         { name: 'Dialog', checked: true },
         { name: 'Loading', checked: true },
         { name: 'LocalStorage', checked: true },
         { name: 'SessionStorage', checked: true },
         { name: 'Notify', checked: true },
      ],
   }

   await inquirer.prompt(prompt).then((answers) => {
      let selections = answers.selections
      let plugins = 'plugins: ['
      selections.map((s) => {
         plugins += `'${s}',`
      })
      plugins += ']'

      const confFile = `./${project}/client/quasar.conf.js`
      fs.readFile(confFile, 'utf-8', function (err, data) {
         if (err) throw err
         let updates = data.replace(/plugins: \[\]/g, plugins)
         fs.writeFile(confFile, updates, 'utf-8', function (err, data) {
            if (err) throw err
         })
      })
      console.log('Power!  Unlimited power!')
   })
}

async function addAppExtensions(project) {
   const prompt = {
      message: 'Select App Extensions',
      name: 'selections',
      type: 'checkbox',
      choices: [
         {
            name: '@quasar/qenv',
            checked: true,
         },
         { name: '@quasar/testing' },
         { name: '@quasar/qmarkdown' },
         { name: '@quasar/qcalendar' },
         { name: '@quasar/qscroller' },
      ],
   }

   await inquirer.prompt(prompt).then(async (answers) => {
      let selections = answers.selections
      selections.map((s) => {
         const child = spawn.sync('quasar', ['ext', 'add', s], {
            cwd: `./${project}/client`,
            stdio: 'inherit',
         })
      })
   })
}

async function addDependencies(project) {
   const prompt = {
      message: 'Select NPM Packages',
      name: 'selections',
      type: 'checkbox',
      choices: [
         {
            name: 'firebase',
            checked: true,
         },
         { name: 'auth0-spa-js', checked: true },
         { name: 'apexcharts', checked: true },
      ],
   }

   await inquirer.prompt(prompt).then(async (answers) => {
      let selections = answers.selections

      if (selections.includes('apexcharts')) selections.push('vue-apexcharts')

      selections = selections.concat(['lodash', 'dayjs', 'uid'])

      selections.map((s) => {
         const child = spawn.sync('yarn', ['add', s], {
            cwd: `./${project}/client`,
            stdio: 'inherit',
         })
      })
   })
}

async function addDevDependencies(project) {
   const prompt = {
      message: 'Select Dev Dependencies',
      name: 'selections',
      type: 'checkbox',
      choices: [
         { name: 'cross-env', checked: true },
         { name: 'vue', checked: true },
         { name: 'vuex', checked: true },
         { name: 'vue-router', checked: true },
         { name: 'npm-run-all', checked: true },
      ],
   }

   await inquirer.prompt(prompt).then(async (answers) => {
      let selections = answers.selections

      selections = selections.concat([
         'eslint',
         'eslint-config-prettier',
         'eslint-plugin-prettier',
         'prettier',
      ])

      selections.map((s) => {
         const child = spawn.sync('yarn', ['add', '-D', s], {
            cwd: `./${project}/client`,
            stdio: 'inherit',
         })
      })
   })
}

async function runQuasarCreate(project) {
   runQuasarInstall(project)

   copyBootstrapFiles(project)

   updateQuasarConfig(project)

   await addAppExtensions(project)

   await addPlugins(project)

   await addDependencies(project)

   await addDevDependencies(project)
}

module.exports = async function (project) {
   console.log('Installing Quasar. You are the chosen one!')
   console.log('-------------------------------')

   await runQuasarCreate(project)

   console.log('')
   console.log('Ok.  The Client is pretty much ready.')
   console.log('')
   quote('han', "You're all clear kid!  Now let's blow this thing and go home!")
}
