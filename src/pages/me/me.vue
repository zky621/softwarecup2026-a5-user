<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const stats = [
  { label: '今日行程', value: '3 段' },
  { label: '收藏点位', value: '8 个' },
  { label: '问答记录', value: '26 条' },
]

const preferenceRows = [
  { icon: 'i-carbon-language', title: '常用语言', value: '中文' },
  { icon: 'i-carbon-direction-straight-right', title: '路线偏好', value: '轻量游览' },
  { icon: 'i-carbon-accessibility', title: '同行需求', value: '老人友好' },
  { icon: 'i-carbon-api', title: '后端接口', value: '待配置' },
]

const tickets = [
  { title: '灵山胜境成人票', time: '今日 09:00-18:00', status: '待核验' },
  { title: '梵宫讲解预约', time: '10:30 场次', status: '已预约' },
]
</script>

<template>
  <view class="page">
    <view class="profile">
      <image class="avatar" src="/static/images/avatar.jpg" mode="aspectFill" />
      <view class="profile-copy">
        <text class="name">
          游客用户
        </text>
        <text class="desc">
          登录后同步行程、收藏、问答记录和小程序身份。
        </text>
      </view>
      <button class="mini-login">
        登录
      </button>
    </view>

    <view class="stats">
      <view v-for="item in stats" :key="item.label" class="stat-card">
        <text class="stat-value">
          {{ item.value }}
        </text>
        <text class="stat-label">
          {{ item.label }}
        </text>
      </view>
    </view>

    <view class="panel">
      <view class="panel-head">
        <text class="panel-title">
          我的票务与预约
        </text>
        <text class="panel-action">
          查看全部
        </text>
      </view>
      <view v-for="item in tickets" :key="item.title" class="ticket-row">
        <view>
          <text class="ticket-title">
            {{ item.title }}
          </text>
          <text class="ticket-time">
            {{ item.time }}
          </text>
        </view>
        <text class="ticket-status">
          {{ item.status }}
        </text>
      </view>
    </view>

    <view class="panel">
      <view class="panel-head">
        <text class="panel-title">
          导览偏好
        </text>
      </view>
      <view v-for="item in preferenceRows" :key="item.title" class="setting-row">
        <view class="setting-left">
          <text :class="['setting-icon', item.icon]" />
          <text class="setting-title">
            {{ item.title }}
          </text>
        </view>
        <view class="setting-right">
          <text>{{ item.value }}</text>
          <text class="i-carbon-chevron-right" />
        </view>
      </view>
    </view>

    <button class="login-btn">
      <text class="i-carbon-logo-wechat" />
      <text>微信授权登录</text>
    </button>
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

.profile,
.stats,
.panel,
.login-btn {
  width: 100%;
  max-width: 720rpx;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
}

.profile,
.setting-row,
.login-btn,
.setting-left,
.setting-right,
.panel-head,
.ticket-row {
  display: flex;
  align-items: center;
}

.profile {
  gap: 20rpx;
  padding: 28rpx;
  border-radius: 24rpx;
  background: #10241f;
  color: #fff;
}

.avatar {
  width: 106rpx;
  height: 106rpx;
  flex-shrink: 0;
  border: 3rpx solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background: #e2f5ed;
}

.profile-copy {
  min-width: 0;
  flex: 1;
}

.name,
.desc,
.stat-value,
.stat-label,
.panel-title,
.ticket-title,
.ticket-time,
.setting-title {
  display: block;
}

.name {
  font-size: 34rpx;
  font-weight: 750;
}

.desc {
  margin-top: 8rpx;
  color: #c6d6d2;
  font-size: 24rpx;
  line-height: 1.45;
}

.mini-login {
  width: 104rpx;
  height: 58rpx;
  margin: 0;
  padding: 0;
  border-radius: 999rpx;
  background: #40d5a8;
  color: #06251d;
  font-size: 24rpx;
  line-height: 58rpx;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 20rpx;
}

.stat-card {
  padding: 22rpx 12rpx;
  border: 1rpx solid #dfe8e5;
  border-radius: 18rpx;
  background: #fff;
  text-align: center;
}

.stat-value {
  color: #16342c;
  font-size: 30rpx;
  font-weight: 750;
}

.stat-label {
  margin-top: 6rpx;
  color: #6f7f7a;
  font-size: 22rpx;
}

.panel {
  margin-top: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #dfe8e5;
  border-radius: 22rpx;
  background: #fff;
}

.panel-head {
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.panel-title {
  font-size: 30rpx;
  font-weight: 720;
}

.panel-action {
  color: #0f766e;
  font-size: 24rpx;
}

.ticket-row {
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #edf2f0;
}

.ticket-row:last-child {
  border-bottom: 0;
}

.ticket-title {
  font-size: 27rpx;
  font-weight: 650;
}

.ticket-time {
  margin-top: 8rpx;
  color: #6f7f7a;
  font-size: 23rpx;
}

.ticket-status {
  flex-shrink: 0;
  color: #c66a2b;
  font-size: 24rpx;
  font-weight: 680;
}

.setting-row {
  justify-content: space-between;
  min-height: 88rpx;
  border-bottom: 1rpx solid #edf2f0;
}

.setting-row:last-child {
  border-bottom: 0;
}

.setting-left,
.setting-right {
  gap: 14rpx;
}

.setting-icon {
  color: #0f766e;
  font-size: 34rpx;
}

.setting-title {
  font-size: 27rpx;
}

.setting-right {
  color: #6f7f7a;
  font-size: 24rpx;
}

.login-btn {
  gap: 12rpx;
  justify-content: center;
  height: 86rpx;
  margin-top: 26rpx;
  border-radius: 18rpx;
  background: #0f766e;
  color: #fff;
  font-size: 28rpx;
  line-height: 86rpx;
}
</style>
