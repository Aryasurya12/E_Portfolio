const fs = require('fs');
let content = fs.readFileSync('data/projects.ts', 'utf8');

// The file literally contains `Assests\SheSpeaks\shespeaks-cover.png`
// In javascript string literal, we want to replace `Assests\SheSpeaks` with `/Assests/SheSpeaks`
// Let's just do a simple replacement for all `Assests\`

content = content.replace(/Assests\\/g, '/Assests/');
content = content.replace(/\\/g, '/');
content = content.replace(/'D:\/Antigravity\/E_Portfolio\/Assests/g, "'/Assests");
content = content.replace(/'Assests/g, "'/Assests");
content = content.replace(/\/\/Assests/g, "/Assests");

fs.writeFileSync('data/projects.ts', content);
console.log('Fixed paths!');
