// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

const PORT = process.env.PORT || 3000;

// SQLite (메모리 DB: 껐다 켜면 초기화됨)
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.run("INSERT INTO messages (text) VALUES ('Hello from SQLite + Render!')");
});

app.get("/", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
