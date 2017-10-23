module.exports = function (app, db) {
    app.get('/api/hunter', function (req, res) {
        db.collection('hunter').find({}, function(err, hunters) {
            if(err) return next(err);

            var retval = [];
            hunters.each(function (err, hunter) {
                if (hunter == null) {
                    if (retval.length == 0)
                        res.send({ok: false, why: "no-hunters-found"});
                    else
                        res.send({ok: true, hunters: retval});
                }
                else {
                    retval.push(hunter);
                }
            })
        });
    })

    app.get('/api/hunter/:hunterId', function (req, res) {
        db.collection('hunter').findOne({hunterId: req.params.hunterId}, function(err, hunter) {
            if(err) return next(err);

            if (hunter != null)
                res.send({ok: true, hunter: hunter});
            else
                res.send({ok: false, why: "hunter-not-found"});
        });
    });

    app.post('/api/hunter', function (req, res) {
        if (!req.body.name) res.send({ok: false, why: "missing-name"});
        db.collection("hunter").findOne({hunterId: req.body.name.toLowerCase().split(' ').join('_')}, function(err, hunter) {
            if(err) return next(err);
            
            if (hunter != null) {
                res.send({ok: false, why: "hunter-already-exists"});
            }
            else {
                var h = {
                    "hunterId": req.body.name.toLowerCase().split(' ').join('_'),
                    "name": req.body.name
                };

                if (req.body.caliber) h.caliber = req.body.caliber;

                db.collection("hunter").insert(h, function(err, document) {
                    if(err) return next(err);

                    res.send({ok: true, hunter: document.ops[0]});
                });
            }
        });
    });

    app.put('/api/hunter', function (req, res) {
        if (!req.body.hunterId) return res.send({ok: false, why: "hunterId-missing"});
        if (!req.body.name && !req.body.caliber) return res.send({ok: false, why: "nothing-to-update"});

        var h = {};
        if (req.body.name) h.name = req.body.name;
        if (req.body.caliber) h.caliber = req.body.caliber;
        db.collection("hunter").findAndModify({hunterId: req.body.hunterId}, [["hunterId", 1]], {$set:h}, {new:true}, function(err, hunter) {
            if(err) return next(err);

            if (!hunter.value) res.send({ok: false, why: "hunter-not-found"});

            res.send({ok: true, hunter: hunter.value});
        });
    });

    app.delete('/api/hunter/:hunterId', function (req, res) {
        db.collection("hunter").findAndRemove({hunterId: req.params.hunterId}, function(err, hunter) {
            if(err) return next(err);

            if (!hunter.value) res.send({ok: false, why: "hunter-not-found"});
            
            res.send({ok: true});
        });
    });
}