const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { config }= require('dotenv')
config();
const userRoutes = require('./routes/user.routes');
const rolRoutes = require('./routes/rol.routes');
const estadoRoutes = require('./routes/estado.routes');
const miembroRoutes = require('./routes/miembro.routes');
const tmembresiaRoutes = require('./routes/tmembresia.routes');
const membresiaRoutes = require('./routes/membresia.routes');
const tarjetaRoutes = require('./routes/tarjeta.routes');
const pagoRoutes = require('./routes/pago.routes');
const entrenadorRoutes = require('./routes/entrenador.routes');
const calificaRoutes = require('./routes/califica.routes');
const claseRoutes = require('./routes/clase.routes');
const horarioRoutes = require('./routes/horario.routes');
const reservaRoutes = require('./routes/reserva.routes');
//usamos express para los middlewares
const app = express();
app.use(bodyParser.json())//parsea el body que reciba
//conectamos la base de datos
mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME    
})

const db = mongoose.connection;
app.use('/user',userRoutes);
app.use('/rol',rolRoutes);
app.use('/estado',estadoRoutes);
app.use('/miembro',miembroRoutes);
app.use('/tmembresia',tmembresiaRoutes);
app.use('/membresia',membresiaRoutes);
app.use('/tarjeta',tarjetaRoutes);
app.use('/pago',pagoRoutes);
app.use('/entrenador',entrenadorRoutes);
app.use('/califica',calificaRoutes);
app.use('/clase',claseRoutes);
app.use('/horario',horarioRoutes);
app.use('/reserva',reservaRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
