#!/usr/bin/env node
const manageNodeModules = require('../lib/manage-node-modules')
const searchReplace = require('../lib/search-replace')
const queryFirestore = require('../lib/query-firestore')
const resetFirestore = require('../lib/reset-firestore')

const program = require('commander')

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
            console.log("The WHERE parameter must be an array encapsulated in a string: \"['foo', '==', 'bar']\"")
            return false
         }
      }
      const payload = { project, collection, where: where ? eval(where) : null }
      queryFirestore(payload)
   })

program
   .command('reset-firestore')
   .alias('reset-fs')
   .description('Wipes data & re-populates with bootstrap data')
   .action(function () {
      resetFirestore()
   })

program.parse(process.argv)
