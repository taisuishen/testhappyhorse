# 789Bingo 抖音热门视频生成

这是一个 Next.js + Vercel 项目：

1. 用户在网页上传人物图片
2. 服务端登录 789Bingo QA 后台
3. 调用上传接口，把图片上传到 OSS，得到公网图片 URL
4. 把公网图片 URL 放到 DashScope `media[0].url`
5. 创建 AI 视频生成任务
6. 前端轮询任务状态并展示视频

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开：

```txt
http://localhost:3000
```

## Vercel 环境变量

在 Vercel Project Settings → Environment Variables 添加：

```env
DASHSCOPE_API_KEY=你的DashScopeKey
BINGO_ACCOUNT=admin
BINGO_PASSWORD=admin
BINGO_FINGERPRINT=72198a2079651758cad4629d7a3da949
```

## 注意

不要把 `.env.local` 提交到 GitHub。
