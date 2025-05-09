const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Simple API endpoint
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(\Server running on port \\);
});
