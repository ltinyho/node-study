const path = require('path');
console.log(path.join('./', __dirname));
console.log(path.relative('./src/index', __dirname));
const kyy = path.resolve('../kaoyayacn', 'knew/View/index.html');
console.log(path.basename(kyy, '.html'));
console.log(path.extname('..kaoyayay.html..dnext'));
console.log(path.parse(kyy));
console.log(path.normalize('../kyy/'));
console.log(path.normalize('././.././kyy/'));
path.isAbsolute()
console.log(path.join('./', 'kyy', 'haha', 'deeggg'));