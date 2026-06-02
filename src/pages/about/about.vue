<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '服务',
  },
})

const serviceCards = [
  {
    icon: 'i-carbon-chat-bot',
    title: '数字人问答',
    text: '游客可以围绕景点、票务、开放时间、活动和设施直接提问，前端预留 Fay 接口接入点。',
  },
  {
    icon: 'i-carbon-map-center',
    title: '路线规划',
    text: '根据游览时长、同行人群和当前位置生成路线，兼容小程序端的定位与扫码入口。',
  },
  {
    icon: 'i-carbon-volume-up',
    title: '语音讲解',
    text: '支持把文本答复转换成播报任务，后续可联动管理端配置的数字人播报状态。',
  },
  {
    icon: 'i-carbon-service-desk',
    title: '附近服务',
    text: '聚合卫生间、出口、餐饮、停车、游客中心等高频服务点，减少游客反复询问。',
  },
]

const integrationItems = [
  { label: 'Web/H5', value: '已可运行' },
  { label: '微信小程序', value: '已可构建' },
  { label: 'Fay 后端', value: '待配置 API 地址' },
]
</script>

<template>
  <view class="page">
    <view class="header">
      <text class="eyebrow">
        Service Console
      </text>
      <text class="title">
        用户端服务能力
      </text>
      <text class="intro">
        这里承载游客侧的真实业务入口，不再是模板页：问答、路线、讲解、附近服务都可以直接演示。
      </text>
    </view>

    <view class="status-grid">
      <view v-for="item in integrationItems" :key="item.label" class="status-card">
        <text class="status-label">
          {{ item.label }}
        </text>
        <text class="status-value">
          {{ item.value }}
        </text>
      </view>
    </view>

    <view class="service-list">
      <view v-for="item in serviceCards" :key="item.title" class="service-card">
        <view class="icon-box">
          <text :class="['service-icon', item.icon]" />
        </view>
        <view class="service-copy">
          <text class="service-title">
            {{ item.title }}
          </text>
          <text class="service-text">
            {{ item.text }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 36rpx 24rpx 150rpx;
  overflow-x: hidden;
  background: #f4f7f6;
  color: #17241f;
}

.header,
.status-grid,
.service-list {
  width: 100%;
  max-width: 720rpx;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
}

.header {
  padding: 30rpx;
  border-radius: 24rpx;
  background: #10241f;
  color: #fff;
}

.eyebrow,
.title,
.intro,
.status-label,
.status-value,
.service-title,
.service-text {
  display: block;
}

.eyebrow {
  color: #8bdcc7;
  font-size: 23rpx;
}

.title {
  margin-top: 10rpx;
  font-size: 42rpx;
  font-weight: 750;
}

.intro {
  margin-top: 16rpx;
  color: #d3e2de;
  font-size: 26rpx;
  line-height: 1.58;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 20rpx;
}

.status-card {
  min-width: 0;
  padding: 20rpx 14rpx;
  border: 1rpx solid #dfe8e5;
  border-radius: 18rpx;
  background: #fff;
}

.status-label {
  color: #6f7f7a;
  font-size: 21rpx;
}

.status-value {
  margin-top: 8rpx;
  color: #16342c;
  font-size: 24rpx;
  font-weight: 700;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 28rpx;
}

.service-card {
  display: flex;
  gap: 20rpx;
  padding: 26rpx;
  border: 1rpx solid #dfe8e5;
  border-radius: 22rpx;
  background: #fff;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72rpx;
  height: 72rpx;
  flex-shrink: 0;
  border-radius: 18rpx;
  background: #e5f6f0;
}

.service-icon {
  color: #0f766e;
  font-size: 38rpx;
}

.service-copy {
  min-width: 0;
  flex: 1;
}

.service-title {
  font-size: 30rpx;
  font-weight: 700;
}

.service-text {
  margin-top: 8rpx;
  color: #697872;
  font-size: 25rpx;
  line-height: 1.55;
}
</style>
