// src/stores/useRealTimeStore.js
import { defineStore } from 'pinia'
import { fetchRealTimeAll } from '@/model/realTimeApi.js'
import dayjs from 'dayjs'

export const useRealTimeStore = defineStore('realTime', {
  state: () => ({
    raw: null,         // 원시 CITYDATA
    loading: false,
    error: null,
  }),
  actions: {
    async load() {
      this.loading = true
      this.error = null
      try {
        this.raw = await fetchRealTimeAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    // 10분마다 자동 갱신
    startAutoRefresh() {
      this.load()
      setInterval(() => this.load(), 600_000)
    }
  },
  getters: {
    subStts: (state) => state.raw?.SUB_STTS ?? [],
    weatherStts: (state) => state.raw?.WEATHER_STTS ?? [],
    roadTraffic: (state) => state.raw?.ROAD_TRAFFIC_STTS?.ROAD_TRAFFIC_STTS ?? [],
    liveSubPpltn: (state) => state.raw?.LIVE_SUB_PPLTN ?? {},

    // 예: WEATHER_STTS 안에 FCST24HOURS 데이터 파싱
    weatherForecast: (state) =>
      state.raw?.WEATHER_STTS?.[0]?.FCST24HOURS.map(item => ({
        dt: dayjs(item.FCST_DT, 'YYYYMMDDHHmm').toDate(),
        temp: Number(item.TEMP),
        sky: item.SKY_STTS
      })) ?? []
  }
})
