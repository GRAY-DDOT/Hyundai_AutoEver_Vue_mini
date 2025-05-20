// src/stores/useRealTimeStore.js
import { defineStore } from 'pinia'
import { fetchRealTimeAll } from '@/model/realTimeApi.js'
// import dayjs from 'dayjs'

/**
 * RealTimeStore
 * 실시간 데이터 API 호출 명령 및 상태 관리
 *
 * @type {StoreDefinition<
 * 'realTime', {raw: null , loading: boolean, error: null},
 * {
 * isReady: ((function(*): {isLoinding: boolean, isError: boolean, isEmpty: boolean})|*),
 * isLoading: (function(*): *),
 * isError: (function(*): boolean),
 * isEmpty: (function(*): boolean),
 *
 * subStts: (function(*): *),
 * weatherStts: (function(*): *), roadTraffic: (function(*): *),
 * liveSubPpltn: (function(*): *)
 * },
 * {load(): Promise<void>, startAutoRefresh(): void}>
 *   }
 */
export const useRealTimeStore = defineStore('realTime', {
  // state : 저장소 상태 정의 (raw, loading, error)
  // raw : 원시 CITYDATA
  // loading : 로딩 상태(기본 값)
  // error :
  state: () => ({
    raw: null,         // 원시 CITYDATA
    loading: false,
    error: null
  }),
  // pinia 기능 중 actions : 상태 변경 메서드 정의
  actions: {
    // 외부 직접 사용 금지 startAutoRefresh 호출 시 자동으로 호출됨
    async load() {
      await tryLoadDataAndCheckStateWhileFetch.call(this)
    },
    // 10분마다 자동 갱신 => 랜더링 기준 최상위 컴포넌트에서 호출
    startAutoRefresh() {
      this.load()
      console.log('5 min passed or initial call : startAutoRefresh')
      setInterval(() => this.load(), 600000)
    }
  },
  getters: {
    /**
     * 상태 확인용 게터 ( 정상 동작시 조건 {isLoinding === true, isError === false, isEmpty  === false})
     * @param state
     * @returns {{isLoinding: boolean, isError: boolean, isEmpty: boolean}}
     */
    isReady: (state) => {
      return {
        isLoinding: state.loading,
        isError: state.error !== null,
        isEmpty: state.raw === null
      }
    },

    /**
     * RealTimeStore-isLoading: 로딩 중이 Ture, 로딩 완료시 False
     * 로딩 상태 확인용 게터
     * @param state
     * @returns {boolean}
     */
    isLoading: (state) => state.loading === true,


    /**
     * RealTimeStore-isError
     * 에러 상태 확인용 게터
     * @param state
     * @returns {boolean}
     */
    isError: (state) => state.error !== null,

    /**
     * RealTimeStore-isError
     * 데이터 정상 응답 및 저장 여부를 확인하는 게터
     * @param state
     * @returns {boolean}
     */
    isEmpty: (state) => state.raw === null

    // Store 내부 책임이 너무 많은 것 같아 데이터 게터들은 추출 예정
    // /**
    //  * RealTimeStore-subStts
    //  * 지하철 관련 정보를 가져오는 게터
    //  * @param state
    //  * @returns {*|*[]}
    //  */
    // subStts: (state) => state.raw?.SUB_STTS ?? [],
    //
    // /**
    //  * RealTimeStore-subStts
    //  * 날씨 관련 정보를 가져오는 게터
    //  * @param state
    //  * @returns {*|*[]}
    //  */
    // weatherStts: (state) => state.raw?.WEATHER_STTS ?? [],
    //
    // /**
    //  * RealTimeStore-roadTraffic
    //  * 도로 혼잡도 관련 정보를 가져오는 게터
    //  * @param state
    //  * @returns {*|*[]}
    //  */
    // roadTraffic: (state) => state.raw?.ROAD_TRAFFIC_STTS?.ROAD_TRAFFIC_STTS ?? [],
    //
    // /**
    //  * RealTimeStore-liveSubPpltn
    //  * 지하철 혼잡도 관련 정보를 가져오는 게터
    //  * @param state
    //  * @returns {*|{}}
    //  */
    // liveSubPpltn: (state) => state.raw?.LIVE_SUB_PPLTN ?? {}


  }
})

async function tryLoadDataAndCheckStateWhileFetch() {
  // 로딩 시작
  this.loading = true
  // 에러 초기화
  this.error = null

  console.log('call tryLoadDataAndCheckStateWhileFetch')

  try {
    // API 호출
    this.raw = await fetchRealTimeAll()
  } catch (e) { // 에러 발생 시
    this.error = e
    console.error('tryLoadDataAndCheckStateWhileFetch error', e)
  } finally {
    // 로딩 종료
    this.loading = false
    console.log('tryLoadDataAndCheckStateWhileFetch finally')
  }
}
