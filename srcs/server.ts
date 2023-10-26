import express, { Express } from 'express';
import path from 'path';

const app: Express = express();
const port = 3000;
const rootDir = __dirname;

app.get('/', (req, res) => {
	const filePath = path.join(rootDir, 'index.html');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
