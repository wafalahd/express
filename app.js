const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Custom middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = date.getHours(); // 0 to 23

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 8 && hour <= 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Register middleware globally to be used on all routes
app.use(workingHoursMiddleware);

// Set up routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/our-services', (req, res) => {
  res.render('our_services');
});

app.get('/contact-us', (req, res) => {
  res.render('contact_us');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
