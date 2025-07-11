const gasUrl = "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";  // ← ここをGASのURLに変えて！

document.getElementById('orderButton').addEventListener('click', () => {
  const userName = document.getElementById('userName').value;
  const room = document.getElementById('room').value;
  const item = document.getElementById('item').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!userName || quantity <= 0) {
    document.getElementById('message').innerText = "名前と数量を正しく入力してください。";
    return;
  }

  const orderData = {
    userName,
    room,
    item,
    quantity
  };

  fetch(gasUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById('message').innerText = "✅ 注文完了！";
    setTimeout(() => liff.closeWindow(), 1500);
  })
  .catch(error => {
    document.getElementById('message').innerText = "⚠️ エラーが発生しました";
    console.error(error);
  });
});

// LIFF初期化（必要なら）
liff.init({ liffId: "YOUR_LIFF_ID" }).catch(err => console.error(err));
