var Guid = require("guid");

module.exports = function (app, db) {
    app.get('/api/hunt', function (req, res) {
        db.collection('hunt').find({}, function(err, hunts) {
            if(err) return next(err);

            var retval = [];
            hunts.each(function (err, hunt) {
                if (hunt == null) {
                    if (retval.length == 0)
                        res.send({ok: false, why: "no-hunts-found"});
                    else
                        res.send({ok: true, hunts: retval});
                }
                else {
                    retval.push(hunt);
                }
            })
        });
    })

    app.get('/api/hunt/:huntId', function (req, res) {
        db.collection('hunt').findOne({huntId: req.params.huntId}, function(err, hunt) {
            if(err) return next(err);

            if (hunt != null)
                res.send({ok: true, hunt: hunt});
            else
                res.send({ok: false, why: "hunt-not-found"});
        });
    });

    app.post('/api/hunt', function (req, res) {
        if (!req.body.hunterId) res.send({ok: false, why: "missing-hunter"});
        if (!req.body.standId) res.send({ok: false, why: "missing-stand"});
        if (!req.body.date) res.send({ok: false, why: "missing-date"});
        if (!req.body.timeOfDay) res.send({ok: false, why: "missing-time-of-day"});
        db.collection("hunter").findOne({hunterId: req.body.hunterId}, function(err, hunter) {
            if(err) return next(err);
            
            if (hunter == null) return res.send({ok: false, why: "invalid-hunter"});

            db.collection("stand").findOne({standId: req.body.standId}, function(err, stand) {
                if(err) return next(err);
                
                if (stand == null) return res.send({ok: false, why: "invalid-stand"});

                var h = {
                    "huntId": Guid.raw(),
                    "hunterId": req.body.hunterId,
                    "standId": req.body.standId,
                    "date": new ISODate(req.body.date),
                    "timeOfDay": req.body.timeOfDay == "morning" ? "morning" : "evening",
                    "observed": req.body.observed && req.body.observed.length > 0 ? req.body.observed : [],
                    "killed": req.body.killed && req.body.killed.length > 0 ? req.body.killed : []
                }

                //TODO: Consider pulling weather here
                if (req.body.weather) h.weather = req.body.weather;
                if (req.body.notes) h.notes = req.body.notes;

                db.collection("hunt").insert(h, function(err, document) {
                    if(err) return next(err);

                    res.send({ok: true, hunt: document.ops[0]});
                });
            });
        });
    });

    app.delete('/api/hunt/:huntId', function (req, res) {
        db.collection("hunt").findAndRemove({huntId: req.params.huntId}, function(err, hunt) {
            if(err) return next(err);

            if (!hunt.value) res.send({ok: false, why: "hunt-not-found"});
            
            res.send({ok: true});
        });
    });
}