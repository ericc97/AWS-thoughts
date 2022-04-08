const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/user-routes');
const imageRoutes = require('./routes/image-upload')

// Express middleware, used to be body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
}

// app.use(require('./routes));
app.use('/api/', userRoutes);
app.use('/api/', imageRoutes); // route for image upload

// Start the API Server
app.listen(PORT, () => console.log(`🌎 => API Server now listening on PORT ${PORT}!`));