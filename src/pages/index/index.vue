<script lang="ts" setup>
import { computed, ref } from 'vue'

defineOptions({
  name: 'Home',
})

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'Fay 导览',
  },
})

interface ChatMessage {
  id: number
  role: 'user' | 'fay'
  text: string
}

const quickPrompts = [
  '第一次来，帮我安排 90 分钟路线',
  '现在附近有什么适合拍照的点位？',
  '老人同行，路线能轻松一点吗？',
  '帮我介绍一下灵山大佛的看点',
]

const scenes = [
  { name: '灵山大佛', status: '推荐', time: '18 分钟后到达', tag: '文化讲解' },
  { name: '梵宫', status: '低排队', time: '步行 12 分钟', tag: '室内参观' },
  { name: '九龙灌浴', status: '即将表演', time: '10:30 场次', tag: '定时演出' },
]

const routeSteps = [
  { title: '入口广场', desc: '核验门票，Fay 读取游客偏好' },
  { title: '灵山大佛', desc: '数字人讲解历史与最佳拍摄机位' },
  { title: '梵宫', desc: '避开高峰，补充室内休息点' },
]

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'fay',
    text: '你好，我是 Fay。可以直接问我景点讲解、路线规划、附近服务和排队情况。',
  },
])
const draft = ref('')
const isListening = ref(false)
const isThinking = ref(false)

const latestStatus = computed(() => isThinking.value ? '生成回复中' : isListening.value ? '语音输入中' : '在线待命')

function createReply(question: string) {
  if (question.includes('老人') || question.includes('轻松')) {
    return '建议走轻量路线：入口广场 -> 梵宫 -> 休息区 -> 灵山大佛远景点。全程减少台阶，并优先选择有座椅的讲解点。'
  }
  if (question.includes('拍照') || question.includes('附近')) {
    return '当前推荐两个拍摄点：灵山大佛中轴线远景位、梵宫外侧水景位。下午逆光较少，适合拍人像和建筑全景。'
  }
  if (question.includes('灵山') || question.includes('大佛')) {
    return '灵山大佛是核心参观点，建议从中轴线远景开始，再到近景平台听完整讲解。Fay 可以按“文化背景、游览动线、拍照机位”三段讲。'
  }
  return '我已按 90 分钟生成路线：入口广场 -> 灵山大佛 -> 九龙灌浴 -> 梵宫。会优先避开排队点，并在每段停留前给出讲解。'
}

function sendMessage(text?: string) {
  const content = (text || draft.value).trim()
  if (!content || isThinking.value)
    return

  messages.value.push({
    id: Date.now(),
    role: 'user',
    text: content,
  })
  draft.value = ''
  isThinking.value = true

  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'fay',
      text: createReply(content),
    })
    isThinking.value = false
  }, 450)
}

function toggleListening() {
  isListening.value = !isListening.value
  uni.showToast({
    title: isListening.value ? '语音输入已开启' : '语音输入已暂停',
    icon: 'none',
  })
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <view class="hero-copy">
        <text class="eyebrow">
          Fay 用户端
        </text>
        <text class="title">
          景区数字人实时导览
        </text>
        <text class="subtitle">
          面向游客的小程序与 Web 端入口，支持问答、路线、讲解和附近服务调试。
        </text>
      </view>

      <view class="avatar-panel">
        <image class="avatar-image" src="/static/images/avatar.jpg" mode="aspectFill" />
        <view class="avatar-meta">
          <view class="live-dot" />
          <text class="avatar-name">
            Fay
          </text>
          <text class="avatar-status">
            {{ latestStatus }}
          </text>
        </view>
      </view>
    </view>

    <view class="command-bar">
      <button :class="['voice-btn', { active: isListening }]" @click="toggleListening">
        <text class="i-carbon-microphone" />
        <text>{{ isListening ? '停止语音' : '语音对话' }}</text>
      </button>
      <button class="route-btn" @click="sendMessage('第一次来，帮我安排 90 分钟路线')">
        <text class="i-carbon-map" />
        <text>生成路线</text>
      </button>
    </view>

    <view class="section chat-card">
      <view class="section-head">
        <view>
          <text class="section-title">
            实时交互
          </text>
          <text class="section-desc">
            当前为本地即时演示，发送函数后续可接入 Fay 后端接口。
          </text>
        </view>
        <text class="i-carbon-chat-bot section-icon" />
      </view>

      <scroll-view class="chat-list" scroll-y>
        <view v-for="item in messages" :key="item.id" :class="['bubble', item.role]">
          <text>{{ item.text }}</text>
        </view>
        <view v-if="isThinking" class="bubble fay thinking">
          <text>Fay 正在整理导览建议...</text>
        </view>
      </scroll-view>

      <view class="prompt-row">
        <button v-for="item in quickPrompts" :key="item" class="prompt" @click="sendMessage(item)">
          {{ item }}
        </button>
      </view>

      <view class="input-bar">
        <input
          v-model="draft"
          class="chat-input"
          confirm-type="send"
          placeholder="输入问题，例如：帮我介绍这个景点"
          placeholder-class="input-placeholder"
          @confirm="sendMessage()"
        />
        <button class="send-btn" @click="sendMessage()">
          <text class="i-carbon-send" />
        </button>
      </view>
    </view>

    <view class="section">
      <view class="section-head compact">
        <text class="section-title">
          推荐点位
        </text>
        <text class="section-link">
          实时热度
        </text>
      </view>
      <view class="scene-list">
        <view v-for="item in scenes" :key="item.name" class="scene-card">
          <view>
            <text class="scene-name">
              {{ item.name }}
            </text>
            <text class="scene-time">
              {{ item.time }}
            </text>
          </view>
          <view class="scene-side">
            <text class="scene-status">
              {{ item.status }}
            </text>
            <text class="scene-tag">
              {{ item.tag }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="section route-card">
      <view class="section-head compact">
        <text class="section-title">
          当前行程
        </text>
        <text class="section-link">
          90 分钟
        </text>
      </view>
      <view class="timeline">
        <view v-for="(item, index) in routeSteps" :key="item.title" class="timeline-row">
          <view class="timeline-index">
            {{ index + 1 }}
          </view>
          <view class="timeline-copy">
            <text class="timeline-title">
              {{ item.title }}
            </text>
            <text class="timeline-desc">
              {{ item.desc }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 28rpx 0 156rpx;
  overflow-x: hidden;
  background: #f4f7f6;
  color: #15231f;
}

.hero,
.section,
.command-bar {
  width: calc(100vw - 32px);
  max-width: 360px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
}

.hero {
  display: flex;
  gap: 24rpx;
  align-items: stretch;
  min-height: 356rpx;
  padding: 30rpx;
  overflow: hidden;
  border-radius: 28rpx;
  background: #12231f;
  color: #fff;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.eyebrow,
.title,
.subtitle,
.avatar-name,
.avatar-status,
.section-title,
.section-desc,
.scene-name,
.scene-time,
.scene-status,
.scene-tag,
.timeline-title,
.timeline-desc {
  display: block;
}

.eyebrow {
  color: #8bdcc7;
  font-size: 24rpx;
}

.title {
  margin-top: 12rpx;
  font-size: 40rpx;
  font-weight: 750;
  line-height: 1.18;
}

.subtitle {
  margin-top: 18rpx;
  color: #d6e4df;
  font-size: 25rpx;
  line-height: 1.55;
}

.avatar-panel {
  width: 188rpx;
  flex-shrink: 0;
  overflow: hidden;
  border: 1rpx solid rgba(255, 255, 255, 0.14);
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.08);
}

.avatar-image {
  display: block;
  width: 188rpx;
  height: 188rpx;
  background: #d8eae4;
}

.avatar-meta {
  position: relative;
  padding: 18rpx 18rpx 20rpx 42rpx;
}

.live-dot {
  position: absolute;
  top: 26rpx;
  left: 18rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #42d68c;
}

.avatar-name {
  font-size: 28rpx;
  font-weight: 700;
}

.avatar-status {
  margin-top: 4rpx;
  color: #bdd4cc;
  font-size: 22rpx;
}

.command-bar {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18rpx;
  margin-top: 20rpx;
}

.voice-btn,
.route-btn,
.send-btn,
.prompt {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
}

.voice-btn,
.route-btn {
  gap: 10rpx;
  height: 82rpx;
  border-radius: 18rpx;
  font-size: 27rpx;
  line-height: 82rpx;
}

.voice-btn {
  background: #0f766e;
  color: #fff;
}

.voice-btn.active {
  background: #c96f2d;
}

.route-btn {
  border: 1rpx solid #c8dbd5;
  background: #fff;
  color: #15231f;
}

.section {
  margin-top: 30rpx;
}

.chat-card,
.route-card {
  padding: 26rpx;
  border: 1rpx solid #dfe8e5;
  border-radius: 24rpx;
  background: #fff;
}

.section-head {
  display: flex;
  gap: 20rpx;
  align-items: flex-start;
  justify-content: space-between;
}

.section-head.compact {
  align-items: center;
}

.section-title {
  font-size: 32rpx;
  font-weight: 720;
}

.section-desc {
  margin-top: 6rpx;
  color: #6f7f7a;
  font-size: 23rpx;
  line-height: 1.45;
}

.section-icon {
  flex-shrink: 0;
  color: #0f766e;
  font-size: 48rpx;
}

.section-link {
  color: #0f766e;
  font-size: 24rpx;
}

.chat-list {
  height: 360rpx;
  margin-top: 22rpx;
  padding-right: 2rpx;
  box-sizing: border-box;
}

.bubble {
  max-width: 84%;
  box-sizing: border-box;
  padding: 18rpx 20rpx;
  border-radius: 18rpx;
  font-size: 26rpx;
  line-height: 1.55;
  word-break: break-word;
}

.bubble + .bubble {
  margin-top: 16rpx;
}

.bubble.user {
  margin-left: auto;
  background: #dff7ee;
  color: #10342b;
}

.bubble.fay {
  margin-right: auto;
  background: #f0f3f2;
  color: #243630;
}

.bubble.thinking {
  color: #6f7f7a;
}

.prompt-row {
  display: flex;
  gap: 12rpx;
  margin-top: 20rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.prompt {
  flex-shrink: 0;
  height: 58rpx;
  padding: 0 18rpx;
  border: 1rpx solid #d7e3df;
  border-radius: 999rpx;
  background: #f7faf9;
  color: #2d413b;
  font-size: 23rpx;
  line-height: 58rpx;
}

.input-bar {
  display: flex;
  gap: 12rpx;
  align-items: center;
  margin-top: 18rpx;
  padding: 12rpx 12rpx 12rpx 22rpx;
  border-radius: 18rpx;
  background: #f5f7f6;
}

.chat-input {
  min-width: 0;
  flex: 1;
  height: 64rpx;
  color: #162923;
  font-size: 25rpx;
}

.input-placeholder {
  color: #8a9692;
}

.send-btn {
  width: 64rpx;
  height: 64rpx;
  padding: 0;
  border-radius: 16rpx;
  background: #10241f;
  color: #fff;
  font-size: 30rpx;
  line-height: 64rpx;
}

.scene-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 18rpx;
}

.scene-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
  border: 1rpx solid #dfe8e5;
  border-radius: 20rpx;
  background: #fff;
}

.scene-name {
  font-size: 29rpx;
  font-weight: 680;
}

.scene-time {
  margin-top: 8rpx;
  color: #6c7975;
  font-size: 24rpx;
}

.scene-side {
  flex-shrink: 0;
  text-align: right;
}

.scene-status {
  color: #c66a2b;
  font-size: 24rpx;
  font-weight: 680;
}

.scene-tag {
  margin-top: 8rpx;
  color: #0f766e;
  font-size: 22rpx;
}

.timeline {
  margin-top: 20rpx;
}

.timeline-row {
  display: flex;
  gap: 18rpx;
  align-items: flex-start;
}

.timeline-row + .timeline-row {
  margin-top: 22rpx;
}

.timeline-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44rpx;
  height: 44rpx;
  flex-shrink: 0;
  border-radius: 50%;
  background: #0f766e;
  color: #fff;
  font-size: 22rpx;
  font-weight: 700;
}

.timeline-copy {
  min-width: 0;
  flex: 1;
}

.timeline-title {
  font-size: 28rpx;
  font-weight: 680;
}

.timeline-desc {
  margin-top: 6rpx;
  color: #6f7f7a;
  font-size: 24rpx;
  line-height: 1.45;
}

@media screen and (max-width: 340px) {
  .hero {
    flex-direction: column;
  }

  .avatar-panel {
    display: flex;
    width: 100%;
  }

  .avatar-image {
    width: 160rpx;
    height: 160rpx;
  }
}
</style>
