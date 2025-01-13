//Primero configuramos el servidor
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Añadimos primera variable con datos para partir desde un punto
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//Creamos url del index
app.get('/', (req, res)=>{
    res.send(`
        <hi>Lista de luchadores</h1>
        <ul>
        ${usuarios.map((usuario)=>`<li>Nombre:${usuario.nombre} | Edad: ${usuario.edad} | Procedencia: ${usuario.lugarProcedencia}</li>`)
            .join('')}
        </ul>
        <a href="/usuarios">Lista de luchadores json</a>
        `
    )
})

//Con esto obtenemos todos los luchadores de la api
app.get('/usuarios', (req, res)=>{
    res.json(usuarios)
})

//Código para obtener un luchador por su nombre
app.get('/usuarios/:nombre', (req, res)=>{
    const nombre = req.params.nombre;
    const luchador = usuarios.find(luchador => luchador.nombre.toLowerCase() === nombre);
    res.json(luchador);
})

//Código para agregar un nuevo luchador a la lista
app.post('/usuarios', (req, res)=>{
    const nuevoLuchador = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
    };
    usuarios.push(nuevoLuchador);
    res.redirect('/');
})


app.listen(3000, () =>{
    console.log('Express está escuchando en el puerto 3000')
})