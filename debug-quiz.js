// Debug script to test quiz generation
const http = require('http');

const data = JSON.stringify({
  religion: "Buddhism",
  unitId: "bud-unit-1", 
  lessonId: "bud-1-1",
  questionsPerType: 1
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/generate-curriculum-quiz',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      console.log('Response:', JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('Raw response:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
