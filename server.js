const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// SQLite (메모리 DB: 껐다 켜면 초기화됨)
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.run("INSERT INTO messages (text) VALUES ('Hello from SQLite + Render!')");
});

// 👉 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public/esafe")));

// 👉 기본 라우트 (http://.../ 로 접속했을 때 index.html 열어줌)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/esafe/index.html"));
});

// 👉 API 라우트
app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
