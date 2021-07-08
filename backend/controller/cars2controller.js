module.exports = function (app) {



    var { QueryTypes, or } = require("sequelize");
    var Buffer = require('safe-buffer').Buffer
    var multer = require("multer");
    var path = require("path");
    var fs = require("fs");

    var bodyParser = require("body-parser");
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(
        bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
        })
    );

    //CORS setttings
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        );
        next();
    });

    app.get("/api/list", function (req, res) {
        orm.query(`select * from cars `, { type: QueryTypes.SELECT }).then(
            function (op) {
                console.log(op);
                res.send({ resp: op });
            }
        )
    })

    app.post("/api/book", function (req, res) {
        let email = req.body.email;
        let uid = req.body.uid;

        orm.query(`update cars set isrented=1 where uid='${uid}' `);
        orm.query(`insert into rented values ('${uid}','${email}')`);
        res.send({ resp: "SUCCESS" });
    })

    app.post("/api/return", function (req, res) {
        let email = req.body.email;
        let uid = req.body.uid;

        orm.query(`update cars set isrented=0 where uid='${uid}' `);
        orm.query(`delete from rented where uid='${uid}'`);
        res.send({ resp: "SUCCESS" });
    })


    app.get("/api/owned", function (req, res) {
        let email = req.body.email;
        orm.query(`select * from cars where email='${email}'`).then(
            function (op) {
                console.log(op);
                res.send({ resp: op });
            }
        )
    })

    app.get("/api/rented/:email", function (req, res) {
        let email = req.params.email;
        orm.query(`select * from cars left join rented on cars.uid=rented.uid where rented.email='${email}'`, { type: QueryTypes.SELECT }).then(
            function (op) {
                console.log(op);
                res.send({ resp: op });
            }
        )
    })
}