# 🚀 Furry Summer MVP 部署教學

完整的從零開始部署指南（圖形介面版本）

## 📋 部署前準備

### 必備資訊

你需要準備以下 Firebase 設定資訊：

```
VITE_FIREBASE_API_KEY=AIzaSyAYpO7aSihlFHE-1oRqMabjxGRON8dklQU
VITE_FIREBASE_AUTH_DOMAIN=furry-summer-520e2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=furry-summer-520e2
VITE_FIREBASE_STORAGE_BUCKET=furry-summer-520e2.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=61985320782
VITE_FIREBASE_APP_ID=1:61985320782:web:10567a98246a913fd4781f
VITE_GAME_END_TIME=2026-05-10T20:30:00+08:00
```

---

## 方法一：Netlify Drop（最簡單）

### 步驟 1：準備專案資料夾

1. 下載並解壓縮 `furry-summer-mvp.zip`
2. **重要：刪除 `node_modules` 資料夾**（如果有的話）
3. 確認資料夾內有以下檔案：
   - ✅ `src/` 資料夾
   - ✅ `public/` 資料夾（如果沒有請建立空資料夾）
   - ✅ `package.json`
   - ✅ `vite.config.js`
   - ✅ `postcss.config.js`
   - ✅ `tailwind.config.js`
   - ✅ `netlify.toml`
   - ✅ `index.html`

### 步驟 2：上傳到 Netlify

1. 前往 https://app.netlify.com/drop
2. 把整個 `furry-summer-mvp` 資料夾**拖曳**到頁面上
3. 等待上傳完成（可能需要幾分鐘）

### 步驟 3：設定環境變數

1. 上傳完成後，點擊 `Site configuration`
2. 點選左側選單的 `Environment variables`
3. 點擊 `Add a variable` → `Add a single variable`
4. 逐一新增以下 7 個環境變數：

| Key | Value |
|-----|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAYpO7aSihlFHE-1oRqMabjxGRON8dklQU` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `furry-summer-520e2.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `furry-summer-520e2` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `furry-summer-520e2.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `61985320782` |
| `VITE_FIREBASE_APP_ID` | `1:61985320782:web:10567a98246a913fd4781f` |
| `VITE_GAME_END_TIME` | `2026-05-10T20:30:00+08:00` |

### 步驟 4：重新部署

1. 回到 `Deploys` 頁面
2. 點擊 `Trigger deploy` → `Deploy site`
3. 等待建置完成（約 1-2 分鐘）

### 步驟 5：測試網站

1. 建置成功後，點擊網站連結（例如 `https://adorable-cat-5dbc69.netlify.app`）
2. 測試登入功能
3. 測試解鎖關卡（使用測試密碼）

---

## 方法二：GitHub + Netlify（最穩定）

### 步驟 1：安裝 GitHub Desktop

1. 前往 https://desktop.github.com/
2. 下載並安裝（Mac 或 Windows）
3. 使用你的 GitHub 帳號登入（`jojo880714`）

### 步驟 2：Clone Repository

1. 打開 GitHub Desktop
2. 點選 `File` → `Clone Repository`
3. 選擇 `furry-summer-mvp2`
4. 選擇存放位置（例如桌面）
5. 點擊 `Clone`

### 步驟 3：複製專案檔案

1. 打開剛才 Clone 下來的資料夾
2. **刪除裡面所有舊檔案**（如果有的話）
3. 把準備好的 `furry-summer-mvp` 資料夾裡的所有檔案複製進去
4. **確保刪除 `node_modules` 資料夾**

### 步驟 4：Push 到 GitHub

1. 回到 GitHub Desktop
2. 左下角看到檔案變更
3. 在 `Summary` 欄位輸入：`Deploy Furry Summer MVP`
4. 點擊 `Commit to main`
5. 點擊上方的 `Push origin`
6. 等待上傳完成

### 步驟 5：連接 Netlify

1. 登入 https://app.netlify.com
2. 點擊 `Add new site` → `Import an existing project`
3. 選擇 `GitHub`
4. 找到 `furry-summer-mvp2` 並點選
5. Build settings 應該會自動設定（由 `netlify.toml` 提供）：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 點擊 `Add environment variables`
7. 新增前面提到的 7 個環境變數
8. 點擊 `Deploy site`

### 步驟 6：等待部署完成

1. 部署時間約 2-3 分鐘
2. 成功後會顯示綠色的 `Published`
3. 點擊網站連結測試

---

## 🔧 常見問題排除

### 問題 1：Build 失敗 - "Cannot find module"

**原因**：`node_modules` 沒有正確安裝

**解決方法**：
1. 確認已刪除本地的 `node_modules` 資料夾
2. Netlify 會自動執行 `npm install`

### 問題 2：頁面顯示 404

**原因**：Publish directory 設定錯誤

**解決方法**：
1. 進入 Netlify → `Site configuration` → `Build & deploy`
2. 確認 `Publish directory` 設為 `dist`
3. 重新部署

### 問題 3：環境變數沒有生效

**原因**：環境變數設定後需要重新部署

**解決方法**：
1. 設定完環境變數後
2. 點擊 `Deploys` → `Trigger deploy` → `Clear cache and deploy site`

### 問題 4：Tailwind CSS 錯誤

**原因**：使用了舊版的 PostCSS 設定

**解決方法**：
1. 確認 `postcss.config.js` 的內容是：
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```
2. 確認 `package.json` 裡有 `"@tailwindcss/postcss": "^4.0.0"`

---

## 📱 建置成功後的驗證步驟

### 1. 測試登入
- [ ] 能夠輸入寵物名稱和飼主名稱
- [ ] 點擊「開始挑戰」後能夠登入

### 2. 測試首頁
- [ ] 顯示倒數計時
- [ ] 顯示目前分數（0 分）
- [ ] 顯示 5 個關卡的鎖定狀態

### 3. 測試解鎖功能
- [ ] 能夠選擇關卡
- [ ] 輸入測試密碼後能夠解鎖
- [ ] 解鎖後分數增加 100
- [ ] 首頁的關卡狀態變為已解鎖

### 4. 測試排行榜
- [ ] 能夠看到自己的名字和分數
- [ ] 排名正確顯示

### 5. 測試個人資料頁
- [ ] 顯示正確的寵物名稱和飼主名稱
- [ ] 顯示正確的分數和解鎖關卡數
- [ ] 成就徽章根據進度點亮

---

## 🎯 部署完成檢查清單

- [ ] 網站能夠正常開啟
- [ ] 所有頁面都能夠正常導航
- [ ] 登入功能正常
- [ ] Firebase 連接正常
- [ ] 倒數計時正常運作
- [ ] 解鎖功能正常
- [ ] 排行榜正常顯示
- [ ] 手機版介面正常

---

## 📞 需要協助？

如果遇到任何問題：

1. **查看 Netlify Build Log**
   - `Deploys` → 點擊最新的部署 → 查看完整 log
   - 截圖錯誤訊息

2. **檢查 Browser Console**
   - 開啟網站後按 F12
   - 查看 Console 有無錯誤訊息
   - 截圖錯誤內容

3. **提供資訊**
   - 截圖 Build log
   - 截圖 Browser console
   - 說明問題發生的步驟

---

## 🎉 部署成功！

恭喜！你的 Furry Summer MVP 已經成功部署！

接下來可以：
- 📱 分享網址給參賽者
- 🔑 更換測試密碼為真實密碼
- 📊 監控參賽者的使用情況
- 🎨 客製化介面顏色和文字

祝活動順利！🐾
