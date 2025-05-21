import axios from 'axios'

export const fetchAir = async () => {
  try {
    const res = await axios.get(
      'http://openAPI.seoul.go.kr:8088/625873796e786f61373379416f617a/json/RealtimeCityAir/1/5/서남권/금천구',
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
