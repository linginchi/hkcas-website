# hkcas-website

国科绿色发展国际实验室（香港）有限公司（HKCAS）官方网站。

线上站点：<https://hkcas.org>（Netlify）

## 本地开发

```bash
npm install
npm run dev          # 仅前端，http://localhost:5173
npm test
npm run build
```

带支付函数时使用 Netlify Dev（需在 `.env` 填入 `.env.example` 中的变量）：

```bash
npx netlify dev
```

员工收款后台：`/staff/pay`

## 咨询费

境外走 Stripe Checkout（HKD），境内同一 Stripe 香港账户以 CNY 收跨境银联信用卡。配置步骤见 [docs/stripe-ops.md](docs/stripe-ops.md)。
