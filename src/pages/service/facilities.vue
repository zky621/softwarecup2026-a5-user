<script lang="ts" setup>
import { computed, ref } from 'vue'
import { facilities } from '../shared/guide-data'

definePage({
  style: {
    navigationBarTitleText: '附近',
    navigationBarBackgroundColor: '#f4f7f3',
    navigationBarTextStyle: 'black',
  },
})

const filters = ['全部', '卫生间', '休息', '餐饮']
const activeFilter = ref('全部')

const visibleFacilities = computed(() => {
  if (activeFilter.value === '全部')
    return facilities
  return facilities.filter(item => item.name.includes(activeFilter.value) || item.desc.includes(activeFilter.value))
})
</script>

<template>
  <view class="page bg-[#f4f7f3] px-4 pb-8 pt-4">
    <view class="panel">
      <view class="title">
        附近服务
      </view>
      <view class="mt-2 text-13px text-[#66756f]">
        从当前位置出发，先找最近、最顺路的地方。
      </view>
      <view class="chips mt-4">
        <view
          v-for="item in filters"
          :key="item"
          class="chip"
          :class="{ active: item === activeFilter }"
          @click="activeFilter = item"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <view class="mt-4 space-y-3">
      <view v-for="item in visibleFacilities" :key="item.name" class="facility">
        <view class="i-carbon-location-filled text-22px text-[#2b765f]" />
        <view class="min-w-0 flex-1">
          <view class="text-16px text-[#20372f] font-800">
            {{ item.name }}
          </view>
          <view class="mt-1 text-12px text-[#66756f]">
            {{ item.desc }}
          </view>
        </view>
        <view class="distance">
          {{ item.distance }}
        </view>
        <button class="go-btn">
          去这
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
.facility {
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

.facility {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chips {
  display: flex;
  gap: 8px;
}

.chip {
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

.distance {
  flex: 0 0 auto;
  color: #8c6128;
  font-size: 12px;
  font-weight: 800;
}

.go-btn {
  flex: 0 0 auto;
  width: 48px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: #e8f2ed;
  color: #1f6d58;
  font-size: 12px;
  font-weight: 800;
  line-height: 32px;
}
</style>
