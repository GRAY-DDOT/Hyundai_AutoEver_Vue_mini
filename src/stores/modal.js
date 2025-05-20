import { defineStore } from 'pinia'

import router from '@/router'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    title: '',
    message: '',
    nextPage: '',
  }),
  actions: {
    open({ title, message }) {
      this.title = title
      this.message = message
      this.isOpen = true
    },
    close() {
      console.log(this.nextPage)
      if (this.nextPage != null && this.nextPage !== '') {
        router.push({ name: this.nextPage, params: {} })
        this.nextPage = ''
        this.isOpen = false
      } else {
        this.isOpen = false
      }
    },
  },
})
