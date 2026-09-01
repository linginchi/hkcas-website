# Stripe 香港账户与 Netlify 上线清单

咨询费走 **香港 HKCAS 单一 Stripe 账户**。境外 Checkout 使用 HKD；境内 Checkout 使用 CNY 展示，并打开跨境银联信用卡。资金进入 HKCAS 的 Stripe/香港银行。本站开香港收据，**不提供内地增值税发票**。

## 1. 开通 Stripe Hong Kong

1. 用 HKCAS 公司资料在 [Stripe](https://dashboard.stripe.com) 注册香港账户并完成 KYC。
2. 打开 [Payment methods](https://dashboard.stripe.com/settings/payment_methods)：
   - 默认配置：Cards（Visa / Mastercard 等）
   - 另建两个 [Payment method configurations](https://dashboard.stripe.com/settings/payment_methods)：
     - `hkcas_overseas`：国际卡。记下 `pmc_...`，写入 `STRIPE_PMC_OVERSEAS`
     - `hkcas_china`：Cards + **China UnionPay**，用于 CNY。记下 ID，写入 `STRIPE_PMC_CHINA`
3. 不要在代码里传 `payment_method_types`。支付方式只在 Dashboard 开关。以后若要开支付宝/微信跨境，也在 Dashboard 打开即可。

## 2. 密钥（Restricted API Key）

1. 在 Developers → API keys 创建 **Restricted key**（`rk_`），不要用完整 `sk_`。
2. 最小权限建议：
   - Checkout Sessions: Write
   - Payment Intents: Read
   - Webhook Endpoints: Read（若用 Dashboard 创建 webhook 则可更窄）
   - Events: Read
3. 测试模式与正式模式使用不同 key。
4. 把 `rk_test_...` / `rk_live_...` 配到 Netlify **Environment variables** 的 `STRIPE_SECRET_KEY`，切勿写入 Git。

## 3. Webhook

1. Endpoint URL：`https://hkcas.netlify.app/api/payments/webhook`

   使用 Netlify 默认域名，而不是 `https://hkcas.org`。自定义域名目前由 Let's Encrypt Generation Y（YE2 / ISRG Root YE）签发，Stripe 的 webhook 投递端不信任这条链，会报 TLS/other errors。`*.netlify.app` 使用 DigiCert，Stripe 可以完成握手。函数本身仍是同一套 `/api/payments/webhook`。
2. 事件：
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
3. 将 signing secret 配为 `STRIPE_WEBHOOK_SECRET`。
4. 本地可用 Stripe CLI：`stripe listen --forward-to localhost:8888/api/payments/webhook`

## 4. Netlify 变量

在 Netlify Site settings → Environment variables 配置：

| 变量 | 用途 |
| --- | --- |
| `STRIPE_SECRET_KEY` | RAK |
| `STRIPE_WEBHOOK_SECRET` | Webhook 验签 |
| `STRIPE_PMC_OVERSEAS` | 境外 PMC ID（可选，未填则用账户默认） |
| `STRIPE_PMC_CHINA` | 境内 PMC ID（可选） |
| `STAFF_GATE_SECRET` | `/staff/pay` 密码 |
| `RESEND_API_KEY` | 联系表单发信 |
| `CONTACT_FROM_EMAIL` | 发件人，需在 Resend 验证域名 |
| `SITE_URL` | 如 `https://hkcas.org` |

构建命令：`npm run build`，发布目录：`dist`。本仓库 `netlify.toml` 已写好 SPA 回退与 `/api/*` 函数映射。

## 5. 使用方式

Stripe 仅用于咨询费。员工在 `https://hkcas.org/staff/pay` 按金额生成链接，客户付完显示咨询费已收到。官网不接受网上捐款。

## 6. 上线前抽测

- 境外：Stripe 测试卡 `4242 4242 4242 4242`，HKD 会话成功，webhook 把记录标为 `paid`。
- 境内：CNY 会话，Checkout 出现卡/银联；测试支付成功。
- 用内地网络打开 Checkout，确认页面可加载。
- 无签名的 webhook 必须返回 400。
- 联系表单提交后，`contact@hkcas.org` 能收到信。

## 7. 已知限制

- 部分内地银联信用卡会拒绝境外商户，这不是代码能保证 100% 通过的。
- Stripe Checkout 在内地偶发不稳定。若转化差，再评估境内 PSP。
- 员工密码是共享口令，不是完整账号系统。人员离职后请轮换 `STAFF_GATE_SECRET` 和 Stripe RAK。
