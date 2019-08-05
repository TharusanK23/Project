const mongoose = require('mongoose');
var host       = require('./models/host');


// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });


    // app.get('/menu', function(req, res) {
    //     res.render('menu.ejs'); // load the index.ejs file
    // });
    // app.get('/contact', function(req, res) {
    //     res.render('contact.ejs'); // load the index.ejs file
    // });
    app.get('/password', function(req, res) {
        res.render('password.ejs'); // load the index.ejs file
    });

    ///////////////////////////////////// get data/////
    // app.get('/detailsArray/:id', function (req, res) {
    //     let id = req.params.id;
    //     axios.get('https://api.thetvdb.com/episodes/'+id)
    //         .then(response => {
    //             let data = response.data;
    //             console.log(data)
    //             res.send(JSON.stringify(data))
    //         })
    //         .catch(error => {
    //             let err = error;
    //             res.send(JSON.stringify(err))
    //         });
    // });

    app.get('/order', (req, res) => {
      host.find({}, function(err, result) {
        if(err) {
          res.send(err);
        } else {
         res.send(result)
        }


      });
    });

  //////////////////////////////////////////////////////////////////////////////////////

   app.get('/checkout', function(req, res) {
        res.render('checkout.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });
   // app.get('/createaccount', function(req, res) {
   //      res.render('createaccount.ejs' , {
   //        user : req.user
   //      }); // load the index.ejs file
   //  });
    app.get('/check', function(req, res) {
        res.render('check.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/contact', function(req, res) {
        res.render('contact.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });
    app.get('/about', function(req, res) {
        res.render('about.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });
    app.get('/menu', function(req, res) {
        res.render('menu.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });
    app.get('/orders', function(req, res) {
        res.render('orders.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });




    app.get('/createaccount', isLoggedIn, function(req, res) {
        res.render('createaccount.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/menu', isLoggedIn, function(req, res) {
        res.render('menu.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/orders', isLoggedIn, function(req, res) {
        res.render('orders.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    app.get('/checkout', isLoggedIn, function(req, res) {
        res.render('checkout.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    app.get('/contact', isLoggedIn, function(req, res) {
        res.render('contact.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    app.get('/check', isLoggedIn, function(req, res) {
        res.render('check.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    app.get('/user', isLoggedIn, function(req, res) {
        res.render('user.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    // app.get('/orders', isLoggedIn, function(req, res) {
    //     res.render('orders.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });

    // });

    /////////////////////////////////////////////////////////////////////////////

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/booklogin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('booklogin.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/menu', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.post('/car/login', passport.authenticate('local-login', {
            successRedirect : '/checkout', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


    // =====================================
    // PROCESS UPDATE PROFILE=======================
    // =====================================
    // process the update profile form
    // app.post('/updateprofile', isLoggedIn, function(req, res) {
    //     user.update({_id: req.session.passport.user}, {
    //         displayName: req.body.displayName 
    //     }, function(err, numberAffected, rawResponse) {
    //        console.log('new profile update error');
    //     });
    //     res.render('profile.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
      // FACEBOOK ROUTES =====================
      // =====================================
      // route for facebook authentication and login
      app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
      }));

      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/',
              failureRedirect : '/login',
              failureFlash : true // allow flash messages
          }));

        // =====================================
        // GOOGLE ROUTES =======================
        // =====================================
        // send to google to do the authentication
        // profile gets us their basic information including their name
        // email gets their emails
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
                passport.authenticate('google', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                }));


                // =====================================
                // TWITTER ROUTES ======================
                // =====================================
                // route for twitter authentication and login
                app.get('/auth/twitter', passport.authenticate('twitter'));

                // handle the callback after twitter has authenticated the user
                app.get('/auth/twitter/callback',
                    passport.authenticate('twitter', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                    }));





        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/host', function(req, res) {


      var newhost = new host();
      newhost.firstName = req.body.firstName;
      newhost.lastName = req.body.lastName;
      newhost.email = req.body.email;
      newhost.address = req.body.address;
      newhost.phonenumber = req.body.phonenumber;
      newhost.model = req.body.model;
      newhost.no= req.body.no;
      newhost.fdate= req.body.fdate;
      newhost.udate = req.body.udate;
      newhost.ins= req.body.ins;
      newhost.tax= req.body.tax;
      newhost.carId = req.body.carId;






          //send mail to us when order comes
                    var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                     service: 'gmail',
                     auth: {
                            user: 'podikilinochchi@gmail.com',
                            pass: 'podi1234'
                        }
                    });
                    var user = req.user
                    var name = user.local.lastname
                    const mailOptions = {
                      from: 'podikilinochchi@gmail.com',// sender address
                      to: 'podikilinochchi@gmail.com', // list of receivers
                      subject: ' New PODI Registration Details', // Subject line
                      html: '' // plain text body
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                       if(err)
                         console.log(err)
                       else
                         console.log(info);
                    });


    	newhost.save(function(err,newhost){
    	    if(err){
            res.redirect('/host');
    	        console.log(err);
    	    }else{
            res.redirect('/success');
    	        console.log("Document Save Done");


                                    //send mail to customer
                                    var nodemailer = require('nodemailer');

                                    var transporter = nodemailer.createTransport({
                                     service: 'gmail',
                                     auth: {
                                            user: 'podikilinochchi@gmail.com',
                                            pass: 'podi1234'
                                        }
                                    });
                                    var user = req.user


                                    const mailOptions = {

                                      from: 'podikilinochchi@gmail.com', // sender address
                                      to: user.local.email, // list of receivers
                                      subject: 'PODI Registration Details', // Subject line
                                      html: '' // plain text body
                                    };
                                    transporter.sendMail(mailOptions, function (err, info) {
                                       if(err)
                                         console.log(err)
                                       else
                                         console.log(info);
                                    });  // load the index.ejs file


    	    }
    		});



          });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
