// src/stores/useRealTimeStore.js
import { defineStore } from 'pinia'
import { fetchRealTimeAll } from '@/model/realTimeApi.js'
import dayjs from 'dayjs'

export const useRealTimeStore = defineStore('realTime', {
  state: () => ({
    raw: null, // 원시 CITYDATA
    loading: false,
    error: null,
    done: false,
  }),
  actions: {
    load() {
      this.loading = true
      this.error = null
      this.done = false

      fetchRealTimeAll()
        .then((val) => {
          console.log('아래는 then 검사')
          console.log(val)
          this.raw = val
          this.done = true
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.loading = false
          this.done = false
        })
    },
    // 10분마다 자동 갱신
    startAutoRefresh() {
      this.load()
      setInterval(() => this.load(), 600_000)
    },
  },
  getters: {
    subStts: (state) => state.raw?.SUB_STTS ?? [],
    weatherStts: (state) => state.raw?.WEATHER_STTS ?? [],
    roadTraffic: (state) => state.raw?.ROAD_TRAFFIC_STTS?.ROAD_TRAFFIC_STTS ?? [],
    liveSubPpltn: (state) => state.raw?.LIVE_SUB_PPLTN ?? {},

    // 예: WEATHER_STTS 안에 FCST24HOURS 데이터 파싱
    weatherForecast: (state) =>
      state.raw?.WEATHER_STTS?.[0]?.FCST24HOURS.map((item) => ({
        dt: dayjs(item.FCST_DT, 'YYYYMMDDHHmm').toDate(),
        temp: Number(item.TEMP),
        sky: item.SKY_STTS,
      })) ?? [],
  },
})
