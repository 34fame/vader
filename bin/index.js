#!/usr/bin/env node
const manageNodeModules = require('../lib/manage-node-modules')
const searchReplace = require('../lib/search-replace')
const resetFirebase = require('../lib/reset-firestore')

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
   .command('reset-firestore')
   .alias('reset-fs')
   .description('Wipes data & re-populates with bootstrap data')
   .action(function () {
      resetFirebase()
   })

program.parse(process.argv)
