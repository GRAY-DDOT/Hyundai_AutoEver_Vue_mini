# API 호출 가이드

> 참고 : 기본 설정으로 10분 마다 자동 갱신되도록 되어 있습니다.
---

## 1. 스토어 불러오기

모든 컴포넌트에서 공통으로 다음과 같이 `useRealTimeStore`를 임포트합니다.

```js
// 예: src/components/MyComponent.vue
<script setup>
import { useRealTimeStore } from '@/stores/useRealTimeStore'
const store = useRealTimeStore()
</script>
```

---

## 2. 상태(state) 접근

* **직접 꺼내기**

  ```js
  const rawData = store.raw
  const isLoading = store.loading
  const loadError = store.error
  ```

* **템플릿 바인딩**

  ```vue
  <template>
    <div v-if="store.loading">로딩 중…</div>
    <div v-else-if="store.error">에러: {{ store.error.message }}</div>
    <div v-else>
      <pre>{{ store.raw }}</pre>
    </div>
  </template>
  ```

---

## 3. 게터(getter) 사용

스토어의 `getters` 로 정의해둔 가공 데이터를 `computed` 없이도 바로 읽을 수 있습니다.

```js
<script setup>
const { subStts, weatherStts, roadTraffic, liveSubPpltn } = store
</script>

<template>
  <h3>지하철 현황</h3>
  <ul>
    <li v-for="st in subStts" :key="st.SUB_STN_NM">
      {{ st.SUB_STN_NM }}: {{ st.SUB_DETAIL.length }}개 도착 정보
    </li>
  </ul>

  <h3>현재 날씨</h3>
  <p>{{ weatherStts[0].TEMP }}°C</p>
</template>
```

---

## 4. 액션(actions) 호출

* **초기 로드**
  onMounted 훅에서 한 번만 로드:

  ```js
  import { onMounted } from 'vue'
  onMounted(() => {
    store.load()
  })
  ```

* **자동 갱신**
  1분마다 데이터를 갱신하고 싶다면:

  ```js
  onMounted(() => {
    store.startAutoRefresh()
  })
  ```

---

## 5. 커스텀 게터/액션 예시

스토어에 정의된 가공 로직이 부족할 때는 컴포저블 대신 간단히 컴포넌트 내부에서 `computed` 를 써도 됩니다.

```js
<script setup>
import { computed, onMounted } from 'vue'
const store = useRealTimeStore()

// 도로 평균 속도만 추출
const avgSpeed = computed(() => 
  store.roadTraffic[0]?.SPD ?? 0
)

onMounted(() => store.load())
</script>

<template>
  <p>평균 속도: {{ avgSpeed }} km/h</p>
</template>
```

---

## 6. 요약 체크리스트

1. **import & instantiate**

   ```js
   import { useRealTimeStore } from '@/stores/useRealTimeStore'
   const store = useRealTimeStore()
   ```
2. **load or startAutoRefresh**

   ```js
   store.load()
   // or
   store.startAutoRefresh()
   ```
3. **state/use getters in template**

  * `store.loading` / `store.error`
  * `store.subStts`, `store.weatherStts`, `store.roadTraffic`, `store.liveSubPpltn`
4. **필요 시 computed 사용**

   ```js
   const foo = computed(() => /* store.raw 가공 */)
   ```

이 가이드를 참고하여, 프로젝트 내 모든 컴포넌트에서 일관된 방법으로 실시간 데이터를 불러오고 표시해 보세요!
