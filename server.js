// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// SQLite (메모리 DB: 서버 재시작하면 초기화됨)
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.run("INSERT INTO messages (text) VALUES ('Hello from SQLite + Render!')");
});

// ✅ 헬스 체크 라우트
app.get("/health", (req, res) => {
  res.send("✅ Backend is running with SQLite");
});

// ✅ API 라우트
app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ✅ 정적 파일 (프론트)
app.use(express.static(path.join(__dirname, "public")));

// ✅ 없는 라우트는 프론트 index.html로 리다이렉트 (SPA 대응 시 필요)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "esafe", "index.html"));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
