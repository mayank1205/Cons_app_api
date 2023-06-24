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

const updateProfile = (req, res) => {
  console.log("update profile")
  const user = req.body;
  db("users").update(user).where("id", "=", req.params.id).returning("*")
  .then((resp) => {
      res.send({
          success: true,
          message: 'user updated successfully',
          data: resp[0]
      });
  }).catch(err => {
      console.log(err);
      res.status(400).json({
          message: "unable to update user"
      });
  });
};

module.exports = {getUsers, updateProfile};