"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.get("/news",'NewsController.getNews');
  Route.get("/news/count",'NewsController.getNewsCount');
  Route.get("/rss",'NewsController.getRss');
  Route.get("/rss/count",'NewsController.getRssCount');
  Route.post("/rss",'NewsController.createRss');
}).prefix('/api/v1')


Route.group(() => {
  //Users admin API
  Route.post('/register', 'UserController.postRegister')
  Route.post('/login', 'UserController.postLogin')
  Route.get('/confirm/:token', 'UserController.postConfirmUser')
  Route.post('/reset_password', 'UserController.postResetPassword')
  Route.post('/logout', 'UserController.postLogout')
}).prefix('/api/v1/auth')
Route.on("/").render("welcome");
