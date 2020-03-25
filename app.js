const myUser = require ('./user.js');
const express = require ('express');
const appServer = express();

var users=[];


appServer.listen (3000, function() {
    console.log('SERVER IS RUNNING ON PORT 3000');
});

appServer.get ('/', function(req, res) {
    res.send ('HELLO WORLD WITH EXPRESS!!!');
});


appServer.get ('/mybasicinfo',  function(req, res) {
    res.send ('THIS IS MY BASIC INFORMATION - My Name Is Carlos Ivan!!!');
}
);


appServer.get ('/myexperience', function(req, res) {
    res.send ('THIS IS MY EXPERIENCE');
}
);


appServer.get ('/getrequest', function(req, res) {
    res.send ('THIS IS A GET REQUEST');
}
);

appServer.post ('/postrequest',function(req, res) {
    res.send ('THIS IS A POST REQUEST');
}
);


appServer.delete ('/deleterequest',function(req, res) {
    res.send ('THIS IS A DELETE REQUEST');
}
);

appServer.put ('/putrequest',function(req, res) {
    res.send ('THIS IS A PUT REQUEST');
}
);

//Middleware, este debe estar antes de todas las rutas
appServer.use(express.json());
appServer.get('/user', function(req, res){
    res.json (myUser);
});

//Middleware, este debe estar antes de todas las rutas
appServer.use(express.json());
appServer.post ('/adduser' , function(req, res){
    var myU = {};
    myU.nombre = req.body.nombre;
    myU.apellido = req.body.apellido;
    myU.edad = req.body.edad;
    myU.carrera = req.body.carrera;
    console.log(myU);
    users.push(myU);
    res.send ('POST USER ADDED');
});

appServer.use(express.json());
appServer.post ('/updateuser/:idUser' , function(req, res){
    var update = false;
    for(var i=0;i<users.length;i++){
        if(i==req.params.idUser){
            users[i].nombre = req.body.nombre;
            users[i].apellido = req.body.apellido;
            users[i].edad = req.body.edad;
            users[i].carrera = req.body.carrera;
            console.log ( req.params.idUser);
            res.send ('USER UPDATED');
            update=true;
        }
    }
    if(!update){
        res.send ('USER not exist');
    }

});

appServer.use(express.json());
appServer.get('/users', function(req, res){
    res.json (users);
});

appServer.use(express.json());
appServer.get('/user/:id', function(req, res){
    var update = false;

    for(var i=0;i<users.length;i++){
        if(i==req.params.id){
            myUser.nombre = users[i].nombre;
            myUser.apellido = users[i].apellido;
            myUser.edad = users[i].edad;
            myUser.carrera = users[i].carrera;
            console.log ( myUser);
            res.send ('USER UPDATED');
            update=true;
            res.json (myUser);
        }
    }
    if(!update){
        res.send ('USER not exist');
    }

});


appServer.use(express.json());
appServer.get('/username/:name', function(req, res){
    var update = false;

    for(var i=0;i<users.length;i++){
        if(users[i].nombre==req.params.name){
            myUser.nombre = users[i].nombre;
            myUser.apellido = users[i].apellido;
            myUser.edad = users[i].edad;
            myUser.carrera = users[i].carrera;
            console.log ( myUser);
            res.send (myUser);
            update=true;
            res.json (myUser);
        }
    }
    if(!update){
        res.send ('USER not exist');
    }

});



appServer.delete('/deleteuser/:id',function(req, res) {
    users.splice(req.params.id, 1);
    res.send ('THIS IS A DELETE REQUEST');
    }
);


appServer.use(express.json());
appServer.get('/usermenor/:edad', function(req, res){
    var update = false;

    for(var i=0;i<users.length;i++){
        if(users[i].edad<req.params.edad){
            myUser.nombre = users[i].nombre;
            myUser.apellido = users[i].apellido;
            myUser.edad = users[i].edad;
            myUser.carrera = users[i].carrera;
            console.log ( myUser);
            res.send ('USER find');
            update=true;
            res.json (myUser);
        }
    }
    if(!update){
        res.send ('USER not exist');
    }

});

