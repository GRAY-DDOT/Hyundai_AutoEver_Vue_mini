import { defineStore } from 'pinia'

export const useAirModalStore = defineStore('airmodal', {
  state: () => ({
    isOpen: false,
    title: '',
    airList: [],
  }),
  actions: {
    open({ title, airList }) {
      this.title = title
      this.airList = airList
      this.isOpen = true
    },
    close() {
      this.isOpen = false
      this.airList = []
    },
  },
})
