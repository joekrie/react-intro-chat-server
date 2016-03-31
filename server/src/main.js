var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var NeDB = require('nedb');
var cors = require('cors');

app.use(cors());
server.listen(8088);

var db = new NeDB({
    filename: 'messages.db',
    autoload: true
});

io.on('connection', function (socket) {   
    socket.on('new-message', msg => {
        db.insert(msg, (err, newDoc) => io.emit('new-message', newDoc));
    });
});

app.get('/all-messages', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.sendStatus(500);
        }
        
        return res.send(docs);
    });
});