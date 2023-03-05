const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const multer = require('multer');

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.mensaje = '';
    socket.on('mensaje', (msg) => {
        console.log('mensaje: ' + msg);
        socket.mensaje = msg;
        io.emit('mensaje2', msg);
        console.log("matalascañas");
    });
    console.log('a user connected');



    //Subida de fotos

    // socket.on('subirFoto', (msg) => {
    //     const storage = multer.diskStorage({
    //         destination: function (req, file, cb) {
    //             cb(null, 'public/uploads')
    //         },
    //         filename: function (req, file, cb) {
    //             const ext = file.originalname.split('.').pop();
    //             cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    //         }
    //     })
    
    //     const upload = multer({ storage: storage })
    
    //     app.post('/upload', upload.single('file'), (req, res) => {
    //         console.log(req.file);
    //         res.send("Imagen subida");
    //     });
    // });

    //Fin subida Fotos
});

// app.get('/', (req, res) => {
//     res.send("Ey");
// });





server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});