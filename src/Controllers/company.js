const db = require('../db/db');


const createCompany = async (req, res) => {
    const company = req.body;
    company.user_id = req.userid;
    let exists = await checkCompanyExists(req.userid,company.name);
    if(exists){
        res.json({
            success: false,
            message: "Company already exists!"
          });
    } else {
        db("company").insert(company).returning("*")
        .then((resp) => {
          res.send({
            success: true,
            message: 'Company created successfully',
            data: resp[0]
          });
        }).catch(err => {
          console.log(err);
          res.status(400).json({
            message: "unable to create company"
          });
        });
    }
  }

  const checkCompanyExists = async (userid,companyname) => {
    let exists = false;
    await db.select("*").from("company")
        .where("user_id", "=", userid)
        .andWhere("name", "=", companyname)
        .returning("*").then( async user => {
          if (user.length > 0) {
            exists =  true;
          } else {
            exists = false;
          }
        });
    return exists;
  }

  const updateCompany = (req, res) => {
    console.log("update company")
    const company = req.body;
    db("company").update(company).where("id", "=", req.params.id).returning("*")
    .then((resp) => {
        res.send({
            success: true,
            message: 'company updated successfully',
            data: resp[0]
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: "unable to update company"
        });
    });
  };

const getCompanies = (req, res) => {
    console.log("getCompanies")
    db.select("id","name","user_id","logo").where("user_id", "=",req.userid).from("company").orderBy('id', 'asc').then(data => {
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

module.exports = {getCompanies, createCompany, updateCompany};