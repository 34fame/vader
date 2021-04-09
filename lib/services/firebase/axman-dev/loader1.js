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
                  displayName: 'Uninett',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'org',
                  cn: 'uib',
                  displayName: 'University of Bergen',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'org',
                  cn: 'uio',
                  displayName: 'University of Oslo',
                  owners: [],
               },
            },
         ],
         divisions: [
            {
               id: uid(),
               metadata: {
                  type: 'div',
                  cn: 'eng',
                  parent: 'uninett',
                  displayName: 'Engineering Division',
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
            {
               id: uid(),
               metadata: {
                  type: 'div',
                  cn: 'fine',
                  parent: 'uib',
                  displayName: 'Fine Art, Music and Design',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'div',
                  cn: 'law',
                  parent: 'uib',
                  displayName: 'Law',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'div',
                  cn: 'admin',
                  parent: 'uib',
                  displayName: 'Administration',
                  owners: [],
               },
            },
         ],
         departments: [
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'tech',
                  parent: 'uninett.ops',
                  displayName: 'Technology Department',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'fin',
                  parent: 'uninett.ops',
                  displayName: 'Finance Department',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'hr',
                  parent: 'uninett.ops',
                  displayName: 'Human Resources Department',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'design',
                  parent: 'uib.fine',
                  displayName: 'Department of Design',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'art',
                  parent: 'uib.fine',
                  displayName: 'Department of Contemporary Art',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'music',
                  parent: 'uib.fine',
                  displayName: 'Department of Music',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'fin',
                  parent: 'uib.admin',
                  displayName: 'Finance',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'dep',
                  cn: 'it',
                  parent: 'uib.admin',
                  displayName: 'Information Technology',
                  owners: [],
               },
            },
         ],
         roles: [
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uninett',
                  displayName: 'Uninett Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'contractors',
                  parent: 'uninett',
                  displayName: 'Uninett Contractors Role',
                  criteria: '(|(hr:type=contractor)(hr:type=part-time))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uninett.eng',
                  displayName: 'Engineering Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uninett.ops',
                  displayName: 'Operations Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uninett.ops.tech',
                  displayName: 'Technology Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'developers',
                  parent: 'uninett.ops.tech',
                  displayName: 'Tech Developers Role',
                  criteria: '(|(hr:position=1101)(hr:position=1102))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'devops',
                  parent: 'uninett.ops.tech',
                  displayName: 'Tech DevOps Role',
                  criteria: '(|(hr:position=1103))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'mgr',
                  parent: 'uninett.ops.tech',
                  displayName: 'Tech Managers Role',
                  criteria: '(|(hr:position=1100))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uninett.ops.hr',
                  displayName: 'Human Resources Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'benefits',
                  parent: 'uninett.ops.hr',
                  displayName: 'HR Benefits Role',
                  criteria: '(|(hr:position=1201))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'staffing',
                  parent: 'uninett.ops.hr',
                  displayName: 'HR Staffing Role',
                  criteria: '(|(hr:position=1202))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uninett.ops.fin',
                  displayName: 'Finance Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'payables',
                  parent: 'uninett.ops.fin',
                  displayName: 'Finance Payables Role',
                  criteria: '(|(hr:position=1301))',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'receivables',
                  parent: 'uninett.ops.fin',
                  displayName: 'Finance Receivables Role',
                  criteria: {
                     operator: 'any',
                     children: [
                        {
                           type: 'rule',
                           query: {
                              rule: 'hr:position',
                              operator: 'contains',
                              value: '1302',
                           },
                        },
                     ],
                  },
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib',
                  displayName: 'UiB Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib.admin',
                  displayName: 'Administration Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib.fine',
                  displayName: 'Fine Arts Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib.law',
                  displayName: 'Law Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib.fine.art',
                  displayName: 'Contemporary Art Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib.fine.design',
                  displayName: 'Design Inherent Role',
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'role',
                  cn: 'all',
                  parent: 'uib.fine.music',
                  displayName: 'Music Inherent Role',
                  owners: [],
               },
            },
         ],
         resources: [
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'o365',
                  parent: 'uninett',
                  displayName: 'Office 365',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'metadir',
                  parent: 'uninett.ops.tech',
                  displayName: 'Metadirectory',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'ad',
                  parent: 'uninett.ops.tech',
                  displayName: 'Active Directory',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'sap',
                  parent: 'uninett.ops.fin',
                  displayName: 'SAP Financials',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'sap',
                  parent: 'uninett.ops.hr',
                  displayName: 'SAP HRMS',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'metadir',
                  parent: 'uib.admin.it',
                  displayName: 'Bergen MetaDirectory',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'adfac',
                  parent: 'uib.admin.it',
                  displayName: 'Faculty Active Directory',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'adstu',
                  parent: 'uib.admin.it',
                  displayName: 'Student Active Directory',
                  owners: [],
               },
               connect: {},
            },
            {
               id: uid(),
               metadata: {
                  type: 'resource',
                  cn: 'gsuite',
                  parent: 'uib',
                  displayName: 'G-Suite',
                  owners: [],
               },
               connect: {},
            },
         ],
         entitlements: [
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uninett.ops.tech.metadir',
                  displayName: 'Metadirectory Account',
                  criteria: ['uninett.all'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uib.admin.it.metadir',
                  displayName: 'Metadirectory Account',
                  criteria: ['all.uib'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uninett.o365',
                  displayName: 'Office 365 Account',
                  criteria: ['uninett.all'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uninett.ops.tech.ad',
                  displayName: 'AD Account',
                  criteria: ['uninett.all'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uninett.ops.fin.sap',
                  displayName: 'SAP Financials Account',
                  criteria: ['uninett.ops.fin.all'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'ap_role',
                  parent: 'uninett.ops.fin.sap',
                  displayName: 'SAP Financials AP Role',
                  criteria: ['uninett.ops.fin.payables'],
                  dependencies: ['uninett.ops.fin.sap.account'],
                  conflicts: ['uninett.ops.fin.sap.ar_role'],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'ar_role',
                  parent: 'uninett.ops.fin.sap',
                  displayName: 'SAP Financials AR Role',
                  criteria: ['uninett.ops.fin.receivables'],
                  dependencies: ['uninett.ops.fin.sap.account'],
                  conflicts: ['uninett.ops.fin.sap.ap_role'],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uninett.ops.hr.sap',
                  displayName: 'SAP HRMS Account',
                  criteria: ['uninett.ops.hr.all'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'benefits_role',
                  parent: 'uninett.ops.hr.sap',
                  displayName: 'SAP HRMS Benefits Role',
                  criteria: ['uninett.ops.hr.benefits'],
                  dependencies: ['uninett.ops.hr.sap.account'],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'staffing_role',
                  parent: 'uninett.ops.hr.sap',
                  displayName: 'SAP HRMS Staffing Role',
                  criteria: ['uninett.ops.hr.staffing'],
                  dependencies: ['uninett.ops.hr.sap.account'],
                  conflicts: [],
                  owners: [],
               },
            },
            {
               id: uid(),
               metadata: {
                  type: 'entitlement',
                  cn: 'account',
                  parent: 'uib.gsuite',
                  displayName: 'G-Suite Account',
                  criteria: ['uib.all'],
                  dependencies: [],
                  conflicts: [],
                  owners: [],
               },
            },
         ],
         users: [
            {
               id: uid(),
               affiliations: {
                  'hr-1102-12121': {
                     metadata: {
                        cn: '12121',
                        displayName: 'Troy Moreland',
                        parent: 'uninett.ops.tech',
                        type: 'user',
                     },
                     source: 'hr',
                     id: '12121',
                     type: 'full-time',
                     departmentId: '1100',
                     department: 'Technology',
                     locationId: 'OSLO',
                     location: 'Oslo Office',
                     positionId: '1102',
                     position: 'Developer II',
                     reportsTo: '1100',
                  },
               },
               primaryAffiliation: 'hr-1102-12121',
               email: 'troy@morelands.net',
               manager: '',
               metadata: {
                  type: 'user',
                  cn: 'troy',
                  displayName: 'Troy Moreland',
                  parent: 'uninett.ops.tech',
               },
            },
            {
               id: uid(),
               affiliations: {
                  'hr-1110-52525': {
                     metadata: {
                        cn: '52525',
                        displayName: 'Anne Hansen',
                        parent: 'uib.admin.it',
                        type: 'user',
                     },
                     source: 'hr',
                     id: '52525',
                     type: 'part-time',
                     departmentId: '1100',
                     department: 'Information Technology',
                     locationId: 'BERGEN1',
                     location: 'Bergen Technology Building',
                     manager: '',
                     positionId: '1110',
                     position: 'Student Temp',
                     reportsTo: '1100',
                  },
                  'fs-fine-1231230': {
                     metadata: {
                        cn: '1231230',
                        displayName: 'Anne Hansen',
                        parent: 'uib.fine.music',
                        type: 'user',
                     },
                     source: 'fs',
                     id: '1231230',
                     type: 'student',
                     email: 'anne_hansen@yahoo.no',
                     departmentId: '1100',
                     department: 'Fine Arts - Music',
                     locationId: 'BERGEN2',
                     location: 'Bergen Fine Arts Building',
                  },
               },
               primaryAffiliation: 'fs-fine-1231230',
               metadata: {
                  type: 'user',
                  cn: 'anne_hansen',
                  displayName: 'Anne Hansen',
                  parent: 'uib.fine.music',
               },
            },
         ],
      },
   }
}

module.exports = loader1
