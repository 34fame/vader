const { uid } = require('uid')

const loader1 = () => {
   return {
      collections: {
         organizations: [
            {
               id: uid(),
               metadata: {
                  type: 'org',
                  cn: 'uninett',
                  parent: null,
                  displayName: 'Uninett Org',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'org',
                  cn: 'uib',
                  parent: null,
                  displayName: 'Bergen Org',
                  owners: [],
               },
            },
         ],
         divisions: [
            {
               id: uid(),
               metadata: {
                  type: 'div',
                  cn: 'tech',
                  parent: 'uninett',
                  displayName: 'Technology Division',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'div',
                  cn: 'ops',
                  parent: 'uninett',
                  displayName: 'Operations Division',
                  owners: [],
               },
            },
         ],
         departments: [
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'pm',
                  parent: 'tech.uninett',
                  displayName: 'Project Management Department',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'asset',
                  parent: 'tech.uninett',
                  displayName: 'Assets Management Department',
                  owners: [],
               },
            },
         ],
         resources: [
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'metadirectory-users',
                  parent: '',
                  displayName: 'Metadirectory Users',
                  owners: [],
               },
               type: 'WSAPI',
               url: 'https://tm-norway1.dev-rapididentity.com/api/rest/restpoint/axman/users',
               headers: {
                  Accept: 'application/json',
               },
               username: null,
               password: null,
               options: {},
               objectsPath: null,
               identifier: 'idautoID',
            },
         ],
      },
   }
}

module.exports = loader1
