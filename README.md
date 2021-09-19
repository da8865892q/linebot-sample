# linebot-sample

Create LineBot sample code with Node.js

## 使用 Node.js 建立 Line 聊天機器人

### 創建一個 Messaging API Channel

- **步驟 1: 登入 LINE Developers Console**
  > 前往官網連結：https://developers.line.biz/en/ 。
  > 使用自己的 Line 帳號進行登入。
- **步驟 2: 以開發者身份註冊 (僅第一次登入時須進行)**
  > ![](https://i.imgur.com/IMoSWYW.png)
- **步驟 3: 建立新的 Provider**
  > Provider 可以隨意命名，可是自己的姓名，組織或是公司名稱。
  > ![](https://i.imgur.com/SrvhTTa.png)
- **步驟 4: 建立新的 Channel**
  > 選擇新增一個 Messaging API channel。
  > ![](https://i.imgur.com/V9lVl5q.png)
- **步驟 5: 確認 Channel 建立成功**
  > ![](https://i.imgur.com/S6gXXm8.png)
- **步驟 6: 取得 Channel 重要資訊**
  > 以下資訊為已刪除之 Channel 資料，請勿嘗試使用。
  > **Channel ID**：前往 Channel 中的 Basic settings 取得。
  > ![](https://i.imgur.com/BHnSyIK.png) > **Channel secret**：前往 Channel 中的 Basic settings 取得。
  > ![](https://i.imgur.com/15Rq8xG.png) > **Channel access token**：前往 Channel 中的 Messaging API settings 取得。
  > ![](https://i.imgur.com/QonzObk.png)

### 撰寫 LineBot Node.js 程式

- **步驟 1: 安裝 node.js 與 npm**
  > 可到官網進行安裝：https://nodejs.org/en/download/ 。
- **步驟 2: 進入專案資料夾初始化文件**
  > 透過 npm 初始化文件：`$ npm init -y`。
- **步驟 3: 透過 npm 安裝 linebot 套件**
  > 藉由指令執行 `$ npm install linebot --save`。
  > 可參考：https://github.com/boybundit/linebot#readme 。
- **步驟 4: 使用下方 sample code**
  > 在資料夾底下，新增 index.js 檔案。
  > 並將下方的 code 貼進該檔案中。
  >
  > ```javascript=
  > // 引用 LineBot SDK
  > const linebot = require('linebot');
  >
  > // 取得 Messaging API Channel 資訊
  > const bot = linebot({
  >   channelId: '1656442528',
  >   channelSecret: 'd4829948046a6c4873d4f48d7118e375',
  >   channelAccessToken: 'HA7BhkuhbgmBfMGGM6bdtskTipNK/Hjl2Z00kIYAXmoX+pMnebcEzRn0puXJ5BgVyLFiYXvPMhSjQbIPCl0ktLqJ9OtcwINHBboQwi3pzWvg73lphpJ8H3Z3yfStxqWuIx2+ebQEKNDEjx4uycpMHwdB04t89/1O/w1cDnyilFU='
  > });
  >
  > // 當有人傳送訊息給Bot時
  > bot.on('message', function (event) {
  >   // event.message.text 為使用者傳給 LineBot 的訊息
  >   const replyMsg = `Hello 我收到了您的訊息為: ${event.message.text}`;
  >   // event.reply 為 LineBot 傳給使用者的訊息
  >   event.reply(replyMsg).then(function (data) {
  >     // 當訊息成功回傳後的處理
  >     console.log('LineBot 訊息發送成功')
  >   }).catch(function (error) {
  >     // 當訊息回傳失敗後的處理
  >     console.log('LineBot 訊息發送失敗')
  >   });
  > });
  >
  > // LineBot 監聽的 Webhook URL 與 port
  > bot.listen('/callback', 8080, function () {
  >     console.log('===== LineBot 已開始運行 =====');
  > });
  > ```

### 透過 ngrok 測試 LineBot

ngrok 可以在 local 運行一個公開的 URL 作為通道直接連結。
這也是 LINE 官方對於使用 Webhook 連結 LineBot 的必要條件之一。

- **步驟 1: 安裝 Homebrew ([點我前往官網](https://brew.sh/))**
  > 可以透過指令確認是否已完成安裝：`$ brew --version`。
  > 若未完成安裝，可以透過下方指令進行安裝。
  > `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **步驟 2: 透過 Homebrew 安裝 ngrok**
  > 藉由指令執行 `$ brew install --cask ngrok`。
- **步驟 3: 運行 ngrok**
  > 因為在 index.js 內所監聽的 port 為 8080。
  > 因此可輸入指令來運行 `$ ngrok http 8080`。
  > 執行後可在終端機上看到 URL。
  > ![](https://i.imgur.com/b0hlMO6.png)
- **步驟 4: 執行 index.js**
  > 透過指令執行 bot `$ node index.js`
- **步驟 5: 發送訊息至 LineBot**
  > 這個小弟踩了雷 Webhook URL 弄了老半天，才發現完全沒有發訊息到 LineBot 的話 Webhook 是監聽不到東西的。

### 設置 Webhook URL

- **前往 LINE Developers Console 設定頁面**
  > 1. 前網 [LINE Developers Console](https://developers.line.biz/console/) 頁面。
  > 2. 選擇 Providers 中的 Messaging API Channel。
  > 3. 前往 Messaging API settings 頁籤。
  > 4. 點擊 Webhook settings 中 Webhook URL 的 Edit 按鈕。
  > 5. 複製 ngrok 的 https 的連結，貼回網頁中 Webhook URL 的欄位。
  >    ![](https://i.imgur.com/5PSpKVx.png) > ![](https://i.imgur.com/hfO0LDp.png)
  > 6. 完成 Update 後，點擊 Verify，確認回傳 Success。

### LineBot 驗收

- **步驟 1: 加 LineBot 好友**
  > 透過 Bot Information 加好友
  > ![](https://i.imgur.com/VcwqaLr.png)
- **步驟 2: 發送測試訊息**
  > 透過 Bot Information 加好友
  > ![](https://i.imgur.com/3Uxg2OK.png)
