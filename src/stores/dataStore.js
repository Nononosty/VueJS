import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './authStore'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    edition: [],
    edition_total: null,

    copy: [],
    copy_total: null,

    items: [], //////////
    errorMessage: '',
  }),
  actions: {
    // Методы для изданий
    async get_edition(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/edition', {
          params: {
            page: page,
            perpage: perpage,
          },
        })
        this.edition = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_edition_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/edition_total')
        this.edition_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    // Методы для копий - нужна auth
    async get_copy(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        const authStore = useAuthStore()
        const response = await axios.get(backendUrl + '/copy', {
          params: {
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })
        this.copy = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_copy_total() {
      this.errorMessage = ''
      try {
        const authStore = useAuthStore()
        const response = await axios.get(backendUrl + '/copy_total', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })
        this.copy_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },
  },
})
