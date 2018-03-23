const fs = require('fs');
fs.readdir('./test', (err, f) => {
  console.log(f);
});
