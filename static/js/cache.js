const fs = require('fs');
fs.readFile("G:\Raga_Projects\classification of arrythmia\cache.txt", function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("Data read : " + data.toString());
    document.getElementById('cache').innerHTML = data.toString();
});