import Vue from 'vue'
import _cloneDeep from 'lodash/cloneDeep'

import { firestore } from 'boot/firebase'

const state = {
   collection: {},
}

const mutations = {
   setCollection: (state, value) => {
      state.collection = value
   },

   setCollectionItem: (state, value) => {
      Vue.set(state.collection, value.id, value)
   },

   deleteCollectionItem: (state, id) => {
      Vue.delete(state.collection, id)
   },
}

const getters = {
   all: (state) => {
      let response = []
      Object.keys(state.collection).map((key) => {
         response.push(_cloneDeep(state.collection[key]))
      })
      return response
   },

   byId: (state) => (id) => {
      return _cloneDeep(state.collection[id])
   },
}

const actions = {
   create: async (context, data) => {
      console.group('create')
      try {
         return await api.createItem(data)
      } catch (err) {
         console.error('store', 'create', err)
         return false
      } finally {
         console.groupEnd()
      }
   },

   update: async (context, data) => {
      console.group('update')
      try {
         return await api.updateItem(data.id, data)
      } catch (err) {
         console.error('store', 'update', err)
         return false
      } finally {
         console.groupEnd()
      }
   },

   delete: async (context, id) => {
      console.group('delete')
      try {
         return await api.deleteItem(id)
      } catch (err) {
         console.error('store', 'delete', err)
         return false
      } finally {
         console.groupEnd()
      }
   },

   bind: async ({ commit }) => {
      try {
         let itemsRef = firestore.collection('items')
         await itemsRef.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
               if (change.type === 'added') {
                  if (!change.doc.metadata.hasPendingWrites) {
                     commit('setCollectionItem', {
                        id: change.doc.id,
                        ...change.doc.data(),
                     })
                  }
               }

               if (change.type === 'modified') {
                  commit('setCollectionItem', {
                     id: change.doc.id,
                     ...change.doc.data(),
                  })
               }

               if (change.type === 'removed') {
                  commit('deleteCollectionItem', change.doc.id)
               }
            })
         })
      } catch (err) {
         console.error('bine', err)
      }
   },
}

export default {
   namespaced: true,
   state,
   mutations,
   getters,
   actions,
}
