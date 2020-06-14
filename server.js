const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// const path = require('path');

app.use(express.static(__dirname + '/build'));

// app.get('*', (request, response) => {
//    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.listen(port, () => {
   console.log('Server is up on', port);
});
