
# LiveKit 演示项目 🚀

这是一个用 **Next.js** 写的简单演示，用来展示如何接入 LiveKit 做直播。里面有推流页面、拉流页面，还有个后台接口生成 token，几个 React 组件负责推/拉流。

---

## 📦 准备工作

开始之前请准备好：

1. 安装 Node.js（建议 v16+）
2. 一台 LiveKit 服务，或者有 LiveKit 的账号（自建/托管都行），能拿到 API key 和 secret
3. 能跑现代浏览器，用来测试页面

---

## 🔧 如何启动

1. 把仓库 clone 下来，安装依赖：
   ```bash
   git clone <仓库地址> && cd livekit
   npm install    # 或者 yarn / pnpm
   ```

2. 根目录建个 `.env` 文件，填上这些：
   ```env
   NEXT_PUBLIC_LIVEKIT_URL=https://你的-livekit-地址
   LIVEKIT_API_KEY=你的_api_key
   LIVEKIT_API_SECRET=你的_api_secret
   ```
   - `NEXT_PUBLIC_LIVEKIT_URL` 会在浏览器端用到，要指向你的 LiveKit 实例。
   - API key/secret 留给后台生成 token 用，别泄露。

---

## 🛠️ 开发模式

启动开发服务器：

```bash
npm run dev
# 或者
# yarn dev
# pnpm dev
# bun dev
```

然后打开浏览器访问 `http://localhost:3000`，可以去这些页面玩：

- `/host` – 用摄像头推流
- `/live` – 观众模式看直播
- `/viewer` – 另一个只看页面（如果需要）

后台 token 接口在 `/api/token`，还有一个 LiveKit REST 例子在 `/api/live`。

---

## 📁 目录结构

```
app/             # Next.js App Router
components/      # React 组件
backend/         # 服务器代码，负责生成 token
hooks/           # 自定义 Hooks，比如 useTradeSocket
store/           # Zustand 状态管理
public/          # 静态资源
```


