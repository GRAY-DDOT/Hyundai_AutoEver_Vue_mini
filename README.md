# 5조 가디의 삶

**조원 : 추창우 김소희 현희찬 김태민**

## 주제

- 웹앱반의 윤택한 삶을 위한 최소한의 필수 정보 모음집

## Git 주소

[GitHub - CHOOSLA/Hyundai_AutoEver_Vue_mini](https://github.com/CHOOSLA/Hyundai_AutoEver_Vue_mini)

## 사용 API

[서울시 실시간 도시데이터](https://data.seoul.go.kr/dataList/OA-21285/F/1/datasetView.do)

[서울시 권역별 실시간 대기환경 현황](http://data.seoul.go.kr/dataList/OA-2219/S/1/datasetView.do)

- api 응답 처리(서울시 실시간 도시데이터)
    - url : **`http://openapi.seoul.go.kr:8088/**${API_KEY}**/json/citydata/1/5/가산디지털단지역**`
    - 교통량, 날씨, 지하철 도착 정보 등 json 으로 반환됨
        
    - realTimeApi.js
        
        ```jsx
        // realTimeApi.js
        import axios from 'axios'
        
        const API_KEY = ''
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
        ```
        
    - useRealTimeStore.js
        
        ```jsx
          // src/stores/useRealTimeStore.js
        import { defineStore } from 'pinia'
        
        import { fetchRealTimeAll } from '@/model/realTimeApi.js'
        // import dayjs from 'dayjs'
        
        /**
         * useRealTimeStore
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
            raw: null, // 원시 CITYDATA
            loading: false,
            error: null,
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
            },
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
                isEmpty: state.raw === null,
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
            isEmpty: (state) => state.raw === null,
        
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
          },
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
          } catch (e) {
            // 에러 발생 시
            this.error = e
            console.error('tryLoadDataAndCheckStateWhileFetch error', e)
          } finally {
            // 로딩 종료
            this.loading = false
            console.log('tryLoadDataAndCheckStateWhileFetch finally')
          }
        }
        
        ```
        
    - 사용 방법
        1. 루트 컴포넌트에 onMounted 훅으로 `store.startAutoRefresh()` 호출
            
            ```jsx
            const store = useRealTimeStore()
            
            onMounted(() => {
              store.startAutoRefresh()
            })
            ```
            
        2. 사용 위치(vue)에 다음 설정 필요 (날씨 데이터를 예시로)
            
            ```jsx
            // useRealTimeStore : 실시간 정보 전역 저장소
            const store = useRealTimeStore()
            
            // computed : useRealTimeStore에서 WEATHER_STTS 데이터 가져옴
            // WEATHER_STTS : 이후 리턴값이 배열이기에 [0]으로 첫 번째 요소를 가져옴
            const weather = computed(() => store.raw?.WEATHER_STTS?.[0] ?? [])
            const forecast = computed(() => weather.value?.FCST24HOURS ?? [])
            
            // computed : useRealTimeStore 로딩 상태 확인 후 불러옴
            // 로딩 중 => 아직 store 내에 접근 가능한 데이터가 없는 상태
            // 로딩 완료를 확인하지 않고 접근 시 undefinded 객체에 접근을 시도하게 된다.
            const isLoading = computed(() => store.isLoading)
            const isError = computed(() => store.isError)
            const isEmpty = computed(() => store.isEmpty)
            ```
            
        3. 데이터 추출 예시
            
            ```jsx
            <div
                v-if="!isLoading && !isError && !isEmpty"
                class="items-center justify-center mx-auto rounded-lg max-w-[800px]"
              >
                <h2 class="text-center font-semibold">날씨</h2>
                <!--      <Modal.vue />-->
                <hr />
                <p>⏱️ 기준 시간 : {{ weather.WEATHER_TIME }}</p>
                <hr />
                <p>🌡 현재 온도 : {{ weather.TEMP }}°C (체감 : {{ weather.SENSIBLE_TEMP }}°C)</p>
                <hr />
                <p>🌡 최고/최저 온도 : {{ weather.MAX_TEMP }}°C / {{ weather.MIN_TEMP }}°C</p>
                <hr />
                <p>
                  💧 습도 : {{ weather.HUMIDITY }}% / 강수 : {{ weather.PRECIPITATION }} ({{
                    weather.PRECPT_TYPE
                  }})
                </p>
                <hr />
                <p>🌞 자외선 지수 : {{ weather.UV_INDEX }} ({{ weather.UV_INDEX_LVL }})</p>
                <hr />
                <p v-html="formattedUvMsg" class="text-xs"></p>
            </div>
            ```
            
    - 관련 트러블 슈팅
        - `BASE_URL` 오타로 잘못된 url로 요청, 응답 확인 난해했음
        - 전역 저장소 `useRealTimeStore`가 아직 로딩(응답 처리) 완료 여부 미확인 및 데이터 접근 시도
            - 내부의 값이 아직 비어있어 undefined 또는 null 응답
            - 추가로 루트 컴포넌트 onMounted 로 처리되기에 전체 페이지 렌더링에 영향을 줌
            - 또한 사용 위치에서도 값 처리를 못해, 렌더링 시 에러를 발생 시킴
            - getter 를 통해 로딩 상태 확인 가능하도록 리팩토링
            - 사용 위치에서 상태를 `computed` *로 확인하며* `v-if="!isLoading && !isError && !isEmpty"` 로 로딩 중 렌더링을 위한 데이터 접근 시도를 방지함.
            - 해결 완료…

## 스크린샷

## 반응형
### 1280px ~ [ 데스크탑 ]
<p align="center"><img width="702" alt="Image" src="https://github.com/user-attachments/assets/c2914b32-4161-4522-bad4-da286ed1a0fb" />

### ~ 1024px [ 노트북 ]
<p align="center"><img width="563" alt="Image" src="https://github.com/user-attachments/assets/bf2f2f44-1c12-4cde-92b2-49e726f4cebd" />

### ~ 640px [ 모바일 ]
<p align="center"><img width="351" alt="Image" src="https://github.com/user-attachments/assets/31784628-1db7-41ad-b70d-b18264202679" />

## 모달 1 : 가산디지털단지역 24시간 날씨 예보

<p align="center"><img width="930" alt="Image" src="https://github.com/user-attachments/assets/e7784bd7-8838-4366-8208-a5950c50cb54" />

## 모달 2 : 서울시 지역별 대기 정보 

<p align="center"><img width="475" alt="Image" src="https://github.com/user-attachments/assets/3390cfdb-329f-4486-b2fb-ac476cf0a80a" />

## 로딩
<p align="center"><img width="475" alt="Image" src="https://github.com/user-attachments/assets/31ac6380-b74a-44cb-9cf2-edbf0196fe23" />

## 기믹

<p align="center"><img width="1028" alt="Image" src="https://github.com/user-attachments/assets/77f0c8a4-bbad-45c9-a7fa-449935d4dbbf" />
