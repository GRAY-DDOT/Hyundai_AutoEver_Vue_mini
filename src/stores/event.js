import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    isWork: false,
    isLoad: false,
  }),
  actions: {
    done() {
      this.isWork = true
    },
    doneLoading() {
      this.isLoad = true
    },
  },
})
