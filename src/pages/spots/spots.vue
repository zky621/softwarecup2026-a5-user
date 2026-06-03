<script lang="ts" setup>
import { ref } from 'vue'
import { spots } from '../shared/guide-data'

definePage({
  style: {
    navigationBarTitleText: '景点',
    navigationBarBackgroundColor: '#f4f7f3',
    navigationBarTextStyle: 'black',
  },
})

const favoriteIds = ref(['buddha', 'bath'])

function toggleFavorite(id: string) {
  favoriteIds.value = favoriteIds.value.includes(id)
    ? favoriteIds.value.filter(item => item !== id)
    : [...favoriteIds.value, id]
}

function go(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="page bg-[#f4f7f3] px-4 pb-8 pt-4">
    <view class="header">
      <view class="text-24px text-[#17362e] font-800">
        现在适合去
      </view>
      <view class="mt-2 text-13px text-[#66756f] leading-5">
        按当前路线和游览节奏整理，先看重点，再慢慢逛。
      </view>
    </view>

    <view class="mt-4 space-y-3">
      <view v-for="spot in spots" :key="spot.id" class="card">
        <view class="flex items-start justify-between gap-3">
          <view>
            <view class="text-17px text-[#20372f] font-800">
              {{ spot.name }}
            </view>
            <view class="mt-1 text-12px text-[#8c6128]">
              {{ spot.tag }} · {{ spot.time }}
            </view>
          </view>
          <view
            :class="favoriteIds.includes(spot.id) ? 'i-carbon-star-filled' : 'i-carbon-star'"
            class="text-20px text-[#d2a447]"
            @click="toggleFavorite(spot.id)"
          />
        </view>
        <view class="mt-3 text-13px text-[#66756f] leading-5">
          {{ spot.desc }}
        </view>
        <view class="tip mt-3">
          {{ spot.tip }}
        </view>
        <view class="card-actions mt-3">
          <button class="small-btn" @click="go('/pages/audio/audio')">
            听讲解
          </button>
          <button class="small-btn ghost" @click="go('/pages/route/route')">
            放进路线
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}

.header,
.card {
  border-radius: 8px;
  background: #fff;
  padding: 18px;
  box-shadow: 0 10px 22px rgba(29, 54, 46, 0.07);
}

.tip {
  border-radius: 8px;
  background: #fff7e6;
  color: #80602f;
  font-size: 12px;
  line-height: 18px;
  padding: 10px 12px;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.small-btn {
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: #1f6d58;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  line-height: 36px;
}

.small-btn.ghost {
  background: #e8f2ed;
  color: #1f6d58;
}
</style>
