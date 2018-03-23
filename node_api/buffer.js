const buf = Buffer.alloc(10);
const len = buf.write('abcd');
console.log(buf.toString('utf8', 3, 9));
console.log(buf.toJSON());
const buf1 = Buffer.from(('11'));
console.log(Buffer.concat([buf, buf1]).toString());
console.log(buf.compare(buf1));

buf1.copy(buf, 4);
console.log(buf.toString());
console.log(buf.slice(1, 5).toString());
console.log(buf.length);