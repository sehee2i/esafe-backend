const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Health Check
app.get("/health", (req, res) => {
  res.send("✅ Backend is running with SQLite");
});

// SQLite 연결
const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.run("INSERT INTO messages (text) VALUES ('Hello from SQLite + Render!')");
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

// 정적 파일 (public/esafe)
app.use(express.static(path.join(__dirname, "public/esafe")));

// ✅ 루트("/")로 들어오면 index.html 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/esafe/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
