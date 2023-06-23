const db = require('../db/db');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const user = req.body;
    let exists =  await checkUserExists(req,res);
    if(exists) {
      res.json({
        success: false,
        message: "Mobile number already exists!"
      });
    } else {
      bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash;
        user.created_by = user.name;
        user.updated_by = user.name;
        db("users").insert(user).returning("*")
        .then((resp) => {
          delete resp[0].password;
          res.send({
            success: true,
            message: 'User registered successfully',
            data: resp[0]
          });
        }).catch(err => {
          console.log(err);
          res.status(400).json({
            message: "unable to create user"
          });
        });
      });
    }
  }
  
  const login = (req, res) => {
      db.select("*").from("users")
        .where("mobile", "=", req.body.mobile)
        .returning("*").then( async user => {
          const token = jwt.sign(
            { userid: user[0].id, mobile:user[0].mobile },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          const result = await bcrypt.compare(req.body.password, user[0].password);
          if (result) {
            // password is valid
            delete user[0].password
            // res.headers.token = token;
            res.append('Authorization', token);
            res.append('Access-Control-Expose-Headers', '*')
            res.append('Access-Control-Allow-Headers', '*')
            res.json({
              success: true,
              data: user[0]
            });
          } else {
            res.json({
              success: false,
              message: "Password incorrect"
            });
          }
          
        }).catch(err =>{
          console.log(err)
          res.json({
            success: false,
            message: "User not found"
          });
        })
  };

  const checkUserExists = async (req,res) => {
    let exists = false;
    await db.select("*").from("users")
        .where("mobile", "=", req.body.mobile)
        .returning("*").then( async user => {
          if (user.length > 0) {
            exists =  true;
          } else {
            exists = false;
          }
        });
    return exists;
  }

  module.exports = {
    signup,
    login
  }