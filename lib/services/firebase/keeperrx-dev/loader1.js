const { uid } = require('uid')

const loader1 = () => {
   return {
      collections: {
         _env: [
            {
               id: 'environment',
               name: 'keeperrx-dev',
            },
         ],
         _aggregates: [
            {
               id: 'events',
               global: {
                  byDate: {},
                  bySeverity: {},
                  bySuccess: {},
                  byType: {},
               },
               tenant: {},
            },
         ],
      },
   }
}

module.exports = loader1
