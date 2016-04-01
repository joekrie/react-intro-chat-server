var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var NeDB = require('nedb');
var cors = require('cors');

var port = process.env.PORT || 8088;

app.use(cors());
server.listen(port);

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
    db.find({})
        .sort({timestamp: 1})
        .exec((err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(docs);
            }
    });
});

app.get('/clear-messages', (req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});