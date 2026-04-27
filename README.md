# 🐾 Furry Summer MVP

毛孩夏日挑戰系統 - Joyner Travel 兩天一夜活動專用

## 📝 專案介紹

這是一個為 Joyner Travel 兩天一夜活動設計的互動挑戰系統，讓 60 位參賽者和 8 隻毛孩一起完成有趣的關卡挑戰！

## ✨ 主要功能

- 🔐 **匿名登入系統** - 使用寵物名稱和飼主名稱快速登入
- 🔓 **關卡解鎖** - 輸入密碼解鎖 5 個不同關卡
- 🎯 **計分系統** - 每解鎖一個關卡獲得 100 分
- 🏆 **即時排行榜** - 查看所有參賽者的分數和排名
- ⏱️ **倒數計時** - 顯示挑戰結束倒數
- 👤 **個人資料頁** - 查看解鎖進度和成就徽章

## 🛠️ 技術架構

- **前端框架**: React 18 + Vite 8
- **路由管理**: React Router v7
- **樣式框架**: Tailwind CSS v4
- **後端服務**: Firebase (Authentication + Firestore)
- **部署平台**: Netlify / Vercel

## 📦 安裝與執行

### 本地開發

1. 安裝依賴套件：
```bash
npm install
```

2. 設定環境變數：
```bash
cp .env.example .env
```

3. 編輯 `.env` 檔案，填入你的 Firebase 設定

4. 啟動開發伺服器：
```bash
npm run dev
```

5. 開啟瀏覽器：http://localhost:5173

### 建置生產版本

```bash
npm run build
```

建置完成的檔案會在 `dist/` 資料夾中。

## 🚀 部署指南

請參考 `DEPLOYMENT.md` 檔案，有詳細的 Netlify 部署步驟。

## 🔑 測試密碼

開發階段使用的固定密碼：

- 關卡 1: `123456`
- 關卡 2: `234567`
- 關卡 3: `345678`
- 關卡 4: `456789`
- 關卡 5: `567890`

⚠️ 正式活動時請更換為真實密碼！

## 📱 頁面說明

- `/login` - 登入頁面
- `/` - 首頁（顯示分數、倒數計時、關卡進度）
- `/unlock` - 解鎖關卡頁面
- `/leaderboard` - 排行榜頁面
- `/profile` - 個人資料頁

## 🔧 Firebase 設定

### Firestore 資料結構

```
users/
  └── {userId}/
      ├── petName: string
      ├── ownerName: string
      ├── score: number
      ├── unlockedChallenges: array
      ├── createdAt: timestamp
      └── lastUnlockTime: timestamp
```

### Authentication

使用 Firebase 匿名登入（Anonymous Authentication），確保已在 Firebase Console 啟用。

## 📄 授權

此專案為 Joyner Travel 活動專用，請勿用於商業用途。

## 👨‍💻 維護者

Claude AI Design Team

---

Made with ❤️ for Furry Friends
