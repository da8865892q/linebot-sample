// 引用 LineBot SDK
const linebot = require('linebot');

// 取得 Messaging API Channel 資訊
const bot = linebot({
  channelId: '1656442528',
  channelSecret: 'd4829948046a6c4873d4f48d7118e375',
  channelAccessToken: 'HA7BhkuhbgmBfMGGM6bdtskTipNK/Hjl2Z00kIYAXmoX+pMnebcEzRn0puXJ5BgVyLFiYXvPMhSjQbIPCl0ktLqJ9OtcwINHBboQwi3pzWvg73lphpJ8H3Z3yfStxqWuIx2+ebQEKNDEjx4uycpMHwdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text 為使用者傳給 LineBot 的訊息
  const replyMsg = `Hello 我收到了您的訊息為: ${event.message.text}`;
  // event.reply 為 LineBot 傳給使用者的訊息
  event.reply(replyMsg).then(function (data) {
    // 當訊息成功回傳後的處理
    console.log('LineBot 訊息發送成功')
  }).catch(function (error) {
    // 當訊息回傳失敗後的處理
    console.log('LineBot 訊息發送失敗')
  });
});

// LineBot 監聽的 Webhook URL 與 port
bot.listen('/callback', 8080, function () {
    console.log('===== LineBot 已開始運行 =====');
});