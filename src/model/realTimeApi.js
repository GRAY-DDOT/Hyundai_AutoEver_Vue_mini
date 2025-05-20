import axios from 'axios'
const API_KEY = '676d71577868796536364a486a684b'
const BASE_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/SeoulMembers/1/1000/`

export async function fetchRealTimeAll() {
  try {
    const { data } = await axios.get(BASE_URL)
    return data.CITYDATA
  } catch (e) {
    console.error('실시간 데이터 호출 실패', e)
    throw e
  }
}
