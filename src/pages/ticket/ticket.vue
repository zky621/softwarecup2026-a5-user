<script lang="ts" setup>
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '门票',
    navigationBarBackgroundColor: '#f4f7f3',
    navigationBarTextStyle: 'black',
  },
})

const showCode = ref(true)
</script>

<template>
  <view class="page bg-[#f4f7f3] px-4 pb-8 pt-4">
    <view class="ticket">
      <view class="text-13px text-[#347561] font-700">
        今日门票
      </view>
      <view class="mt-2 text-24px text-[#17362e] font-900">
        待入园核验
      </view>
      <view class="mt-2 text-13px text-[#66756f]">
        2 张成人票 · 订单号 202606030018
      </view>
      <view class="qr mt-6" @click="showCode = !showCode">
        <view v-if="showCode" class="i-carbon-qr-code text-82px text-[#1f6d58]" />
        <view v-else class="text-center text-13px text-[#66756f] leading-5">
          已隐藏二维码<br>轻点再次显示
        </view>
      </view>
      <view class="mt-4 text-center text-12px text-[#66756f]">
        到检票口出示二维码
      </view>
    </view>

    <view class="panel mt-4">
      <view class="row">
        <text>入园时间</text>
        <text>今天 09:00-17:00</text>
      </view>
      <view class="row">
        <text>使用人数</text>
        <text>2 人</text>
      </view>
      <view class="row">
        <text>检票口</text>
        <text>主入口</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}

.ticket,
.panel {
  border-radius: 8px;
  background: #fff;
  padding: 22px;
  box-shadow: 0 10px 22px rgba(29, 54, 46, 0.07);
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #edf1ee;
  color: #66756f;
  font-size: 13px;
  padding: 12px 0;

  &:last-child {
    border-bottom: 0;
  }

  text:last-child {
    color: #17362e;
    font-weight: 800;
  }
}

.qr {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  border-radius: 8px;
  background: #f7faf8;
}
</style>
