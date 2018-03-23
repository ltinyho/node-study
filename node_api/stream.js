const fs           = require('fs');
let data           = '';
const readerStream = fs.createReadStream('./efi.zip');
const writerStream = fs.createWriteStream('./out.zip');
let i              = 0;

readerStream.pipe(writerStream);
readerStream.on('data', (res) => {
  data += res;
});
readerStream.on('end', () => {
  console.log(data.length);
});

writerStream.on('finish', () => {
  console.log('finish');
});

