# Fay 用户端 uni-app

这是 Fay 数字人项目的游客侧用户端仓库，基于 `uni-app + Vue 3 + TypeScript + Vite` 搭建，可同时输出 Web/H5 和微信小程序端。

当前页面已经从上游 `unibest` 模板改为 Fay 业务演示：

- `导览`：数字人头像状态、实时文字问答、语音按钮、快捷问题、推荐点位、当前行程。
- `服务`：用户端能力入口，包括数字人问答、路线规划、语音讲解、附近服务。
- `我的`：游客资料、票务预约、导览偏好、登录入口。

## 本地运行

```bash
pnpm install --frozen-lockfile
pnpm dev:h5 --host 127.0.0.1
```

H5 默认端口来自 `env/.env`：

```bash
http://127.0.0.1:9000/
```

## 构建

```bash
pnpm type-check
pnpm build:h5
pnpm build:mp-weixin
```

构建产物：

- H5：`dist/build/h5`
- 微信小程序：`dist/build/mp-weixin`

如果本机未配置微信开发者工具 CLI，`build:mp-weixin` 仍会生成小程序产物，但无法自动打开开发者工具。需要在 `env/.env` 配置 `WECHAT_DEVTOOLS_CLI_PATH`。

## 后端接入点

首页当前提供本地即时回复，用于没有后端时直接演示交互。后续接入 Fay 后端时，优先替换 `src/pages/index/index.vue` 内的 `sendMessage` / `createReply` 逻辑：

- 文本问答：接 Fay 对话接口。
- 语音输入：接小程序录音能力或 Web 端麦克风能力。
- 数字人播报：接 Fay 管理端/运行端的播报或状态接口。
- 路线和点位：接景区知识库、地图点位和运营数据接口。
