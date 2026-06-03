<script lang="ts" setup>
import { computed, ref } from 'vue'
import { questions } from '../shared/guide-data'

definePage({
  style: {
    navigationBarTitleText: '问一下',
    navigationBarBackgroundColor: '#f4f7f3',
    navigationBarTextStyle: 'black',
  },
})

interface Message {
  role: 'visitor' | 'guide'
  text: string
}

const selectedQuestion = ref(questions[0])
const draft = ref('')
const messages = ref<Message[]>([
  { role: 'visitor', text: '我只有两个小时，怎么逛比较合适？' },
  { role: 'guide', text: '建议走半日轻松路线：先看灵山大佛，再去九龙灌浴，最后进梵宫休息参观。' },
])

const reply = computed(() => {
  if (selectedQuestion.value.includes('老人'))
    return '可以走入口、灵山大佛、九龙灌浴、梵宫这条线。台阶多的地方慢一点，中途在广场和梵宫各休息一次。'
  if (selectedQuestion.value.includes('表演'))
    return '下一场九龙灌浴在 14:30，建议 14:15 前到广场中后方，视野比较完整。'
  if (selectedQuestion.value.includes('休息'))
    return '最近的休息区在广场右侧，旁边有卫生间和饮水点。'
  return '两个小时建议看灵山大佛和九龙灌浴，再按体力决定是否进梵宫。这样不赶，也不容易绕路。'
})

function pickQuestion(question: string) {
  selectedQuestion.value = question
  draft.value = question
}

function sendQuestion() {
  const text = draft.value || selectedQuestion.value
  messages.value = [
    ...messages.value,
    { role: 'visitor', text },
    { role: 'guide', text: reply.value },
  ]
  draft.value = ''
}
</script>

<template>
  <view class="page bg-[#f4f7f3] px-4 pb-8 pt-4">
    <view class="panel">
      <view class="title">
        想问什么？
      </view>
      <view class="mt-2 text-13px text-[#66756f] leading-5">
        可以直接问路线、景点、演出、吃饭和附近设施。
      </view>
      <view class="ask-box mt-4" @click="sendQuestion">
        <text class="text-[#8a9691]">
          {{ draft || '例如：下一场演出在哪里看？' }}
        </text>
        <view class="i-carbon-send text-20px text-[#2b765f]" />
      </view>
      <view class="answer mt-3">
        {{ reply }}
      </view>
    </view>

    <view class="panel mt-4">
      <view class="title">
        试着这样问
      </view>
      <view class="mt-3 space-y-2">
        <view
          v-for="item in questions"
          :key="item"
          class="question"
          :class="{ active: item === selectedQuestion }"
          @click="pickQuestion(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <view class="panel mt-4">
      <view class="title">
        最近对话
      </view>
      <view class="mt-3 space-y-3">
        <view v-for="item in messages" :key="item.text" :class="item.role === 'visitor' ? 'bubble mine' : 'bubble'">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}

.panel,
.question,
.ask-box,
.answer,
.bubble {
  border-radius: 8px;
}

.panel {
  background: #fff;
  padding: 18px;
  box-shadow: 0 10px 22px rgba(29, 54, 46, 0.07);
}

.title {
  color: #17362e;
  font-size: 18px;
  font-weight: 800;
}

.ask-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7faf8;
  padding: 13px 14px;
  font-size: 13px;
}

.question {
  background: #f7faf8;
  color: #41554f;
  font-size: 14px;
  line-height: 20px;
  padding: 11px 13px;
}

.question.active {
  background: #e5f2ec;
  color: #1f5f4f;
  font-weight: 800;
}

.answer {
  background: #fff7e6;
  color: #80602f;
  font-size: 13px;
  line-height: 20px;
  padding: 11px 13px;
}

.bubble {
  max-width: 82%;
  background: #f7faf8;
  color: #41554f;
  font-size: 13px;
  line-height: 20px;
  padding: 11px 13px;
}

.mine {
  margin-left: auto;
  background: #e5f2ec;
  color: #1f5f4f;
}
</style>
