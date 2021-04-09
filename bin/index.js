#!/usr/bin/env node
const manageNodeModules = require('../lib/manage-node-modules')
const searchReplace = require('../lib/search-replace')
const queryFirestore = require('../lib/query-firestore')
const exportFirestore = require('../lib/export-firestore')
const importFirestore = require('../lib/import-firestore')
const resetFirestore = require('../lib/reset-firestore')
const createProject = require('../lib/create-project')
const destroyProject = require('../lib/destroy-project')

const program = require('commander')

program
   .command('create-project')
   .alias('cp')
   .description('Create a new project')
   .action(function () {
      createProject()
   })

program
   .command('destroy-project')
   .alias('dp')
   .description('Recursively deletes a project')
   .action(function () {
      destroyProject()
   })

program
   .command('node-modules')
   .alias('nm')
   .description('Manage node_modules')
   .action(function () {
      manageNodeModules()
   })

program
   .command('search-replace')
   .alias('sr')
   .description('Perform a recursive search/replace')
   .action(function () {
      searchReplace()
   })

program
   .command('query-firestore [project] [collection] [where]')
   .alias('qfs')
   .description('Get Doc IDs from a firestore collection')
   .action(function (project, collection, where) {
      if (where) {
         let isValid = false
         try {
            isValid = Array.isArray(eval(where))
         } catch (err) {
            console.log(
               "The WHERE parameter must be an array encapsulated in a string: \"['foo', '==', 'bar']\""
            )
            return false
         }
      }
      const payload = { project, collection, where: where ? eval(where) : null }
      queryFirestore(payload)
   })

program
   .command('export-firestore [project]')
   .alias('exfire')
   .description('Exports all collection data to a file')
   .action(function (project) {
      exportFirestore(project)
   })

program
   .command('import-firestore [project] [file]')
   .alias('imfire')
   .description('Imports data into Firestore')
   .action(function (project, file) {
      importFirestore(project, file)
   })

program
   .command('reset-firestore')
   .alias('rfs')
   .description('Wipes data & re-populates with bootstrap data')
   .action(function () {
      resetFirestore()
   })

program.parse(process.argv)
