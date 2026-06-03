<script lang="ts" setup>
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '演出',
    navigationBarBackgroundColor: '#f4f7f3',
    navigationBarTextStyle: 'black',
  },
})

const shows = [
  { name: '九龙灌浴', time: '14:30', place: '九龙灌浴广场', status: '建议提前 15 分钟到' },
  { name: '梵宫讲解', time: '15:20', place: '梵宫入口', status: '适合室内慢游' },
  { name: '夜场灯光', time: '19:00', place: '主广场', status: '以现场开放为准' },
]

const reminded = ref(['九龙灌浴'])

function toggleReminder(name: string) {
  reminded.value = reminded.value.includes(name)
    ? reminded.value.filter(item => item !== name)
    : [...reminded.value, name]
}
</script>

<template>
  <view class="page bg-[#f4f7f3] px-4 pb-8 pt-4">
    <view class="panel">
      <view class="title">
        今天的演出
      </view>
      <view class="mt-2 text-13px text-[#66756f]">
        时间可能随天气和现场客流调整。
      </view>
    </view>
    <view class="mt-4 space-y-3">
      <view v-for="item in shows" :key="item.name" class="show-card">
        <view class="time">
          {{ item.time }}
        </view>
        <view class="min-w-0 flex-1">
          <view class="text-16px text-[#20372f] font-800">
            {{ item.name }}
          </view>
          <view class="mt-1 text-12px text-[#66756f]">
            {{ item.place }}
          </view>
          <view class="mt-2 text-12px text-[#8c6128]">
            {{ item.status }}
          </view>
        </view>
        <button class="remind-btn" :class="{ active: reminded.includes(item.name) }" @click="toggleReminder(item.name)">
          {{ reminded.includes(item.name) ? '已提醒' : '提醒' }}
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}

.panel,
.show-card {
  border-radius: 8px;
  background: #fff;
  padding: 18px;
  box-shadow: 0 10px 22px rgba(29, 54, 46, 0.07);
}

.title {
  color: #17362e;
  font-size: 20px;
  font-weight: 800;
}

.show-card {
  display: flex;
  gap: 14px;
}

.remind-btn {
  flex: 0 0 auto;
  width: 58px;
  height: 34px;
  border: 0;
  border-radius: 8px;
  background: #e8f2ed;
  color: #1f6d58;
  font-size: 12px;
  font-weight: 800;
  line-height: 34px;
}

.remind-btn.active {
  background: #1f6d58;
  color: #fff;
}

.time {
  flex: 0 0 auto;
  width: 58px;
  border-radius: 8px;
  background: #e8f2ed;
  color: #1f6d58;
  font-size: 16px;
  font-weight: 900;
  line-height: 42px;
  text-align: center;
}
</style>
