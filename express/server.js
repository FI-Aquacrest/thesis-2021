const express = require('express');
 
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

const feedbackStorage = [];

app.post('/feedback_form', (req, res) => {
  feedbackStorage.push(JSON.stringify(req.body));
  res.send({ message: 'Feedback received. Thank you!' });
});

app.get('/feedback_storage', (req, res) => {
  res.send(JSON.stringify(feedbackStorage));
});
