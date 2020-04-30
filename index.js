const app = require('./app');
const port = process.env.PORT || 5000;


// app.listen(port, ()=> console.log(`Server works on port : ${port}`));

const server = app.listen(process.env.PORT || 5000, function () {
    const port = server.address().port;
    console.log("Server is working on port " + port);
});
