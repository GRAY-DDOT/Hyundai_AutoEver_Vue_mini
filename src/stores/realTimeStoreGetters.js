// import dayjs from 'dayjs'
import { useRealTimeStore } from '@/stores/useRealTimeStore.js'

const store = useRealTimeStore()

/**
 * 목적별 데이터 가공
 */


/**
 * 지하철역별 실시간 혼잡도
 * @param state
 * @returns {*|null}
 */
export function subStts(state) {
  if (state.raw === null) return null
  const subwayData = state.raw.map((item) => ({
    station: item.STATION_NM,
    congestion: item.CONGESTION,
    time: item.TIME,
  }))
  return subwayData
}

/**
 * 날씨정보
 * @param state
 * @returns {*|null}
 */
export function weatherStts(state) {
  if (state.raw === null) return null
  const weatherData = state.raw.map((item) => ({
    temperature: item.TEMP,
    humidity: item.HUMIDITY,
    windSpeed: item.WIND_SPEED,
    time: item.TIME,
  }))
  return weatherData
}

/**
 * 도로교통정보
 * @param state
 * @returns {*|null}
 */
export function roadTraffic(state) {
  if (state.raw === null) return null
  const trafficData = state.raw.map((item) => ({
    roadName: item.ROAD_NAME,
    congestionLevel: item.CONGESTION_LEVEL,
    time: item.TIME,
  }))
  return trafficData
}

/**
 * 지하철역별 실시간 혼잡도
 * @param state
 * @returns {*|null}
 */
export function liveSubPpltn(state) {
  if (state.raw === null) return null
  const liveData = state.raw.map((item) => ({
    station: item.STATION_NM,
    inCount: item.IN_COUNT,
    outCount: item.OUT_COUNT,
    time: item.TIME,
  }))
  return liveData
}
