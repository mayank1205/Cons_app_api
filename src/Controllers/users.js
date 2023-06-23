const db = require('../db/db');


const getUsers = (req, res) => {
    console.log("getusers")
    db.select("id","name","mobile","email").from("users").orderBy('id', 'asc').then(data => {
        res.json({
          success: true,
          data: data,
          count: data.length
        });
      }).catch(err => {
        console.log(err);
        res.status(400).json(err)
      });
};

module.exports = {getUsers};