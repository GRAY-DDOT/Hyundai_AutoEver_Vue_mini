import axios from 'axios'

const API_KEY = '676d71577868796536364a486a684b'
const BASE_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata/1/5/가산디지털단지역`

/**
 * Fetch real-time data from the API
 * api 요청 및 응답 처리(axios)
 * useRealTimeApi.js 에서 내부적으로 호출하므로 직접 호출은 자제
 *
 * @returns {Promise<*>}
 */
export async function fetchRealTimeAll() {
  try {
    // api 요청 호출
    console.log('call fetchRealTimeAll')
    const { data } = await axios.get(BASE_URL)
    console.log('get success api response')
    console.log(data.CITYDATA)
    return data.CITYDATA
  } catch (e) {
    console.error('실시간 데이터 호출 실패', e)
    throw e
  }
}
