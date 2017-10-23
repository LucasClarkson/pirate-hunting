module.exports = function (app, db) {
    app.get('/api/stand', function (req, res) {
        db.collection('stand').find({}, function(err, stands) {
            if(err) return next(err);

            var retval = [];
            stands.each(function (err, stand) {
                if (stand == null) {
                    if (retval.length == 0)
                        res.send({ok: false, why: "no-stands-found"});
                    else
                        res.send({ok: true, stands: retval});
                }
                else {
                    retval.push(stand);
                }
            })
        });
    })

    app.get('/api/stand/:standId', function (req, res) {
        db.collection('stand').findOne({standId: req.params.standId}, function(err, stand) {
            if(err) return next(err);

            if (stand != null)
                res.send({ok: true, stand: stand});
            else
                res.send({ok: false, why: "stand-not-found"});
        });
    });

    app.post('/api/stand', function (req, res) {
        if (!req.body.name) return res.send({ok: false, why: "missing-name"});
        if (!req.body.location || !req.body.location.lat || !req.body.location.lng) return res.send({ok: false, why: "missing-location"});
        if (!req.body.locationType) return res.send({ok: false, why: "missing-location-type"});

        db.collection("stand").findOne({standId: req.body.name.toLowerCase().split(' ').join('_')}, function(err, stand) {
            if(err) return next(err);
            
            if (stand != null) {
                res.send({ok: false, why: "stand-already-exists"});
            }
            else {
                var s = {
                    "standId": req.body.name.toLowerCase().split(' ').join('_'),
                    "name": req.body.name,
                    "location": req.body.location,
                    "locationType": req.body.locationType
                };

                db.collection("stand").insert(s, function(err, document) {
                    if(err) return next(err);

                    res.send({ok: true, stand: document.ops[0]});
                });
            }
        });
    });

    app.put('/api/stand', function (req, res) {
        if (!req.body.standId) return res.send({ok: false, why: "standId-missing"});
        if (!req.body.name && !req.body.location && !req.body.locationType) return res.send({ok: false, why: "nothing-to-update"});

        var s = {};
        if (req.body.name) s.name = req.body.name;
        if (req.body.location && req.body.location.lat && req.body.location.lng) s.location = req.body.location;
        if (req.body.locationType) s.locationType = req.body.locationType;
        db.collection("stand").findAndModify({standId: req.body.standId}, [["standId", 1]], {$set:s}, {new:true}, function(err, stand) {
            if(err) return next(err);

            if (!stand.value) res.send({ok: false, why: "stand-not-found"});

            res.send({ok: true, stand: stand.value});
        });
    });

    app.delete('/api/stand/:standId', function (req, res) {
        db.collection("stand").findAndRemove({standId: req.params.standId}, function(err, stand) {
            if(err) return next(err);

            if (!stand.value) res.send({ok: false, why: "stand-not-found"});
            
            res.send({ok: true});
        });
    });
}