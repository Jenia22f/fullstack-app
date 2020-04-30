const app = require('./app');
// const port = process.env.PORT || 5000;
const port = process.env.PORT;


app.listen(port, ()=> console.log(`Server works on port : ${port}`));
