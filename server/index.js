const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let posts = [
  {
    title: 'Cross Site Scripting ',
    content:
      'Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.',
    authour: 'Mr.Jaden',
  },
];
let id = 1;

const badRegex = /^((a+)+)+$/;

const validate = (content) => {
  console.time('regex');
  if (badRegex.test(content)) {
    console.timeEnd('regex');
    throw Error('Bad content');
  }
  console.timeEnd('regex');
};

app.post('/api/posts', (req, res) => {
  const { title, content, authour } = req.body;
  console.log('about to set post')
  validate(content);
  posts.push({ id: id++, title, content, authour });
  res.status(201).json({ message: 'Post has been created successfully !!' });
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});


const PORT=5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
