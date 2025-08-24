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

// ✅ API 라우트 먼저!
app.get("/health", (req, res) => {
  res.send("✅ Backend is running with SQLite");
});

app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ✅ 그다음에 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public/esafe")));

// 기본 루트 (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/esafe/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
