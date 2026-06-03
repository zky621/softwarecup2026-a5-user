<script lang="ts" setup>
import { computed, ref } from 'vue'
import { routeSteps } from '../shared/guide-data'

definePage({
  style: {
    navigationBarTitleText: '路线',
    navigationBarBackgroundColor: '#f4f7f3',
    navigationBarTextStyle: 'black',
  },
})

const routeOptions = [
  { name: '半日轻松逛', time: '3.5h', level: '轻松', note: '第一次来、带孩子或长辈同行', steps: routeSteps },
  { name: '两小时重点看', time: '2h', level: '省时', note: '赶时间时先看大佛和九龙灌浴', steps: ['入口', '灵山大佛', '九龙灌浴', '出口'] },
  { name: '慢慢听讲解', time: '4h', level: '慢游', note: '多留讲解和休息时间', steps: ['入口', '灵山大佛', '梵宫', '休息区'] },
]

const selectedIndex = ref(0)
const selectedRoute = computed(() => routeOptions[selectedIndex.value])

function selectRoute(index: number) {
  selectedIndex.value = index
}

function go(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="page bg-[#f4f7f3] px-4 pb-8 pt-4">
    <view class="panel">
      <view class="text-12px text-[#347561] font-700">
        推荐路线
      </view>
      <view class="mt-2 text-24px text-[#17362e] font-800">
        {{ selectedRoute.name }}
      </view>
      <view class="mt-2 text-13px text-[#66756f] leading-5">
        {{ selectedRoute.note }}。节奏不赶，重点点位都能看到。
      </view>
      <view class="chips mt-4">
        <view
          v-for="(item, index) in routeOptions"
          :key="item.name"
          class="chip"
          :class="{ active: index === selectedIndex }"
          @click="selectRoute(index)"
        >
          {{ item.name }}
        </view>
      </view>
      <view class="grid grid-cols-3 mt-4 gap-3">
        <view class="stat">
          <view class="num">
            {{ selectedRoute.time }}
          </view>
          <view class="label">
            用时
          </view>
        </view>
        <view class="stat">
          <view class="num">
            {{ selectedRoute.steps.length }}
          </view>
          <view class="label">
            点位
          </view>
        </view>
        <view class="stat">
          <view class="num">
            {{ selectedRoute.level }}
          </view>
          <view class="label">
            强度
          </view>
        </view>
      </view>
    </view>

    <view class="panel mt-4">
      <view class="title">
        走法
      </view>
      <view class="timeline mt-4">
        <view v-for="(step, index) in selectedRoute.steps" :key="step" class="step">
          <view class="dot">
            {{ index + 1 }}
          </view>
          <view>
            <view class="text-16px text-[#20372f] font-800">
              {{ step }}
            </view>
            <view class="mt-1 text-12px text-[#66756f]">
              {{ index === 0 ? '扫码入园后开始' : '按现场指引前往' }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="actions mt-4">
      <button class="primary-btn" @click="go('/pages/audio/audio')">
        <view class="i-carbon-headphones text-18px" />
        边走边听
      </button>
      <button class="secondary-btn" @click="go('/pages/service/facilities')">
        <view class="i-carbon-location text-18px" />
        找附近
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}

.panel {
  border-radius: 8px;
  background: #fff;
  padding: 18px;
  box-shadow: 0 10px 22px rgba(29, 54, 46, 0.07);
}

.chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.chip {
  flex: 0 0 auto;
  border-radius: 999px;
  background: #f7faf8;
  color: #48645b;
  font-size: 12px;
  font-weight: 800;
  padding: 8px 11px;
}

.chip.active {
  background: #1f6d58;
  color: #fff;
}

.title {
  color: #17362e;
  font-size: 18px;
  font-weight: 800;
}

.stat {
  border-radius: 8px;
  background: #f7faf8;
  padding: 12px 8px;
  text-align: center;
}

.num {
  color: #1f6d58;
  font-size: 17px;
  font-weight: 900;
}

.label {
  margin-top: 3px;
  color: #7a8b85;
  font-size: 11px;
}

.step {
  display: flex;
  gap: 12px;
  padding: 0 0 18px;
}

.dot {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #1f6d58;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.primary-btn,
.secondary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border: 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 800;
  gap: 6px;
  line-height: 42px;
}

.primary-btn {
  background: #1f6d58;
  color: #fff;
}

.secondary-btn {
  background: #fff;
  color: #1f6d58;
}
</style>
