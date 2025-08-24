const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// ✅ SQLite (메모리 DB: 껐다 켜면 초기화됨)
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.run("INSERT INTO messages (text) VALUES ('Hello from SQLite + Render!')");
});

// ✅ 정적 파일 (프론트엔드)
app.use(express.static(path.join(__dirname, "public")));

// ✅ 백엔드 상태 확인용 (심사용)
app.get("/health", (req, res) => {
  res.send("✅ Backend is running with SQLite");
});

// ✅ API 예시
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
