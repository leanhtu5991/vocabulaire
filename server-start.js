var path = require('path');
process.env.SERVER_PORT= process.env.SERVER_PORT || '3000'
process.env.JWT_SECRET='0a6b944d-d2fb-46fc-a85e-0295c986cd9f'
process.env.DOCUMENTS_PATH= path.join(__dirname, 'uploads')
process.env.DOCUMENTS_PATH2= path.join(__dirname, 'public/src/assets/uploads')
require('./server');
