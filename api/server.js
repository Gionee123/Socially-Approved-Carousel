const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminModel = require('./src/models/Admin.Schema');
require('dotenv').config();

const server = express();
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.get('/', (request, response) => {
  response.send('Server Working Fine.....');
});

require('./src/routes/admin/video.routes')(server);
require('./src/routes/admin/Like.routes')(server);
require('./src/routes/admin/Comment.routes')(server);
require('./src/routes/admin/adminAuth.routes')(server);

require('./src/routes/website/video.routes')(server);
require('./src/routes/website/Like.routes')(server);
require('./src/routes/website/Comment.routes')(server);

require('./src/routes/admin/product.routes')(server);

server.get('*', (request, response) => {
  response.send('Page not found.....');
});


mongoose.connect(process.env.MONGODB_URI).then(
  async () => {

    const checkAdmin = await adminModel.find();
    if (checkAdmin.length == 0) {
      let admin = await adminModel({ adminName: 'admin', adminPassword: 'admin123' });
      await admin.save();
    }


    server.listen(process.env.PORT || '5000', () => {
      console.log('Database Connected!');
      console.log(`Server Running on Port ${process.env.PORT || 5000}`);
    });
  }
).catch((error) => {
  console.log('Database Not Connected!' + error);
});
