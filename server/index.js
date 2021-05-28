const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');
require('./database');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const port = 3000;
app.listen(port, () => console.log(`started on port: http://localhost:${port}`));
