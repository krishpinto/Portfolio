const fs = require('fs');
const chars = {
  'K': [
    'XX   XX',
    'XX  XX ',
    'XXXXX  ',
    'XXXX   ',
    'XXXX   ',
    'XXXXX  ',
    'XX  XX ',
    'XX   XX'
  ],
  'R': [
    'XXXXXX ',
    'XX   XX',
    'XX   XX',
    'XXXXXX ',
    'XXXXX  ',
    'XX XX  ',
    'XX  XX ',
    'XX   XX'
  ],
  'I': [
    ' XXXX ',
    '  XX  ',
    '  XX  ',
    '  XX  ',
    '  XX  ',
    '  XX  ',
    '  XX  ',
    ' XXXX '
  ],
  'S': [
    ' XXXXX',
    'XX    ',
    'XX    ',
    ' XXXXX',
    '    XX',
    '    XX',
    '    XX',
    'XXXXX '
  ],
  'H': [
    'XX   XX',
    'XX   XX',
    'XX   XX',
    'XXXXXXX',
    'XXXXXXX',
    'XX   XX',
    'XX   XX',
    'XX   XX'
  ]
};

let path = '';
let offsetX = 0;
['K', 'R', 'I', 'S', 'H'].forEach(c => {
  const lines = chars[c];
  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === 'X') {
        const px = (offsetX + x) * 32;
        const py = y * 32;
        path += `M${px} ${py} h32 v32 h-32 Z `;
      }
    }
  });
  offsetX += lines[0].length + 2; // add 2 units spacing
});

console.log(path);
