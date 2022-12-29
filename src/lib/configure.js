const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '..','.env');
if (!fs.existsSync(envPath)) {
  console.error();
  console.error('>>>>>>> No .env file exists.');
  console.error();

  process.exit(1);
}

dotenv.config({
  path: envPath,
});
