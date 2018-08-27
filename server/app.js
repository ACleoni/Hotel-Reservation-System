const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

// GraphQl Dependencies
const graphqlHTTP = require('express-graphql');
const GraphQLSchema = require('./schema');

// Middleware for sending confirmation email of booked reservation
const usersRouter = require('./routes/users');

// Express Initialization
const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'application/graphql' }));
app.use(cookieParser());

// GraphQL Initialization with graphiql user interface enabled
app.use('/graphql', graphqlHTTP((req, res) => ({
  schema: GraphQLSchema,
  context:
  {
    user: req.user, res
  },
  graphiql: true,
  formatError: error => ({
    message: error.message
  })
})));

// Route Intitialization
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
