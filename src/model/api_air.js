import axios from 'axios'

export const fetchAir = async () => {
  try {
    const res = await axios.get(
      'https://openAPI.seoul.go.kr:8088/625873796e786f61373379416f617a/json/RealtimeCityAir/1/5/서남권/금천구',
    )

    const data = res.data.RealtimeCityAir?.row?.[0]
    if (data) {
      return {
        dateTime: data.MSRDT,
        region: data.MSRRGN_NM,
        station: data.MSRSTE_NM,
        pm10: data.PM10,
        pm25: data.PM25,
        o3: data.O3,
        no2: data.NO2,
        co: data.CO,
        so2: data.SO2,
        airQuality: data.IDEX_NM,
        airIndex: data.IDEX_MVL,
        mainPollutant: data.ARPLT_MAIN,
      }
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchAirAll = async () => {
  try {
    const res = await axios.get(
      'http://openAPI.seoul.go.kr:8088/625873796e786f61373379416f617a/json/RealtimeCityAir/1/25/',
    )

    if (res.data?.RealtimeCityAir?.RESULT?.CODE === 'INFO-000') {
      return res.data.RealtimeCityAir.row.map((item) => ({
        station: item.MSRSTE_NM,
        region: item.MSRRGN_NM,
        dateTime: item.MSRDT,
        pm10: item.PM10,
        pm25: item.PM25,
        o3: item.O3,
        no2: item.NO2,
        co: item.CO,
        so2: item.SO2,
        airQuality: item.IDEX_NM,
        airQualityValue: item.IDEX_MVL,
        mainPollutant: item.ARPLT_MAIN,
      }))
    } else {
      throw new Error('API error or invalid data')
    }
  } catch (err) {
    console.log(err)
  }
}
