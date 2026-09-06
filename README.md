# About Typora

[**Typora**](https://andrii-kaliuha.github.io/typora/) is a web application for improving typing skills. Practice in different modes, watch session replays to analyze mistakes, and track progress with detailed result history.

## 📷 Screenshots

<div align="center">
  <h3>Test Page</h3>
  <img src="public/screenshots/TestPage.png" width="100%" alt="Test Page">

  <h3>History Page</h3>
  <img src="public/screenshots/HistoryPage.png" width="100%" alt="History Page">
</div>

## ✨ Features

- **Typing Metrics** — Real-time speed and accuracy tracking
- **Performance Replay** — Watch and analyze your typing sessions
- **Different Modes** — Normal, Strict, and Accuracy training modes
- **Custom Settings** — Choose duration, language, or custom text
- **Detailed History** — Save results with filters and pagination
- **Visual Sharing** — Save result statistics as an image

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** CSS
- **Localization:** react-i18next
- **Build Tooling:** Vite

## 📁 Project Structure

```text
src/
├── app/                    # App entry point and global styles
├── assets/                 # Static assets (icons, SVGs, screenshots)
├── features/
│   ├── filter/             # History filtering logic and UI
│   ├── history/            # Test result history display
│   ├── sort/               # History sorting logic and UI
│   ├── test-config/        # Test configuration panel
│   ├── test-result/        # Test results display
│   └── typing-test/        # Core typing test UI
├── pages/
│   ├── HistoryPage/
│   ├── LearningPage/
│   └── TestPage/
├── shared/
│   ├── hooks/              # Сustom hooks
│   ├── localization/       # i18n config and locale files
│   ├── types/              # Global TypeScript types
│   ├── ui/                 # Reusable UI components
│   └── utils/              # Helper functions (formatters, storage, typing)
├── store/                  # Redux store, slices, selectors
└── widgets/                # Composite UI blocks (Header, HistoryList)
```

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/andrii-kaliuha/typora.git

# Go to project folder
cd typora

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🚀 Future Improvements

- **Charts:** Add typing statistics visualization with Chart.js
- **Custom Text Library:** Save and manage a personal collection of practice texts
- **Offline Support:** PWA support with IndexedDB for local storage
