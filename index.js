const express = require('express');
const app = express();
const port = 3000;

// Stage 0
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Stage 1
app.get('/', (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({ "status": "ok" });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});