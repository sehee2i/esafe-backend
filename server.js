const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SQLite (메모리 DB)
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.run("INSERT INTO messages (text) VALUES ('Hello from SQLite + Render!')");
});

// ✅ 정적 파일 제공 (frontend 배포)
app.use(express.static(path.join(__dirname, "public", "esafe")));

// 기본 라우터
app.get("/", (req, res) => {
  res.send("✅ Backend is running with SQLite");
});

// 메시지 API
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
  console.log(`🚀 Server running on port ${PORT}`);
});
