const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const multer = require('multer');

app.use(express.static('public'));

var usuario = [];

io.on('connection', (socket) => {
    socket.mensaje = '';
    socket.usuarios = [];
    socket.nombre = '';
    socket.estado = '';
    socket.on('mensaje', (msg) => {
        console.log('mensaje: ' + msg);
        socket.mensaje = msg;
        io.emit('mensaje2', msg);
    });
    console.log('a user connected');

    socket.on('disconnect', () => {
        io.emit('desconectado', socket.nombre);
    });


    socket.on("datos", (datos) => {
        socket.nombre = datos.nombre;
        socket.estado = datos.estado;
        socket.foto = datos.foto;

        data={
            nombre: socket.nombre,
            estado: socket.estado,
            foto: socket.foto
        }

        usuario.push(data);

        // socket.usuarios.push(usuario);
        io.emit('datos2', data);
        io.emit("conectado", socket.nombre, data);
    });

    socket.on("escribiendo", (dato) => {
        io.emit("escribiendo", dato);
    });


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

app.post('/uploads', function(req, res) {
    console.log(req.files.file_input); // the uploaded file object
  });

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});