const express = require('express'); // importo la dependencia express
const morgan = require('morgan'); // importo el morgan
const app = express();  // creo el servidor con express
const PORT = 3000; // levanto el puerto 3000

const productsRouter = require('./routes/products.js'); // importo el archivo products de las rutas
const categoriesRouter = require('./routes/categories.js');
const ordersRouter = require('./routes/orders.js');
const usersRouter = require('./routes/users.js');

app.use(morgan('dev'));  // Le digo al servidor "app" que use el morgan con su propiedad 'dev' que nos dará la información en colores.
app.use(express.json()); // para evitar que req.body sea undefined. Parseo a json lo que nos llega de la petición

app.use(express.urlencoded({extended:false})); // para parsear a json un tipo de body que nos llega de la petición

app.use('/products',productsRouter); // Añado las rutas de products
app.use('/categories',categoriesRouter); 
app.use('/orders',ordersRouter); 
app.use('/users',usersRouter); 

app.listen(PORT, ()=>console.log('server running on ' + PORT));  // Pongo al puerto a escuchar peticiones
