const db = require('../db/db');


const createSite = async (req, res) => {
    const site = req.body;
    db("sites").insert(site).returning("*")
    .then((resp) => {
      res.send({
        success: true,
        message: 'Site created successfully',
        data: resp[0]
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        message: "unable to create site"
      });
    });
  }

  const updateSite = (req, res) => {
    console.log("update site")
    const site = req.body;
    db("sites").update(site).where("id", "=", req.params.id).returning("*")
    .then((resp) => {
        res.send({
            success: true,
            message: 'site updated successfully',
            data: resp[0]
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: "unable to update site"
        });
    });
  };

const getSites = (req, res) => {
    console.log("getSites")
    db.select("*").from("sites").orderBy('id', 'asc').then(data => {
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

const getSiteDetails = (req, res) => {
  console.log("getSiteDetails")
  db.select("*").from("sites").where("id", "=", req.params.id).orderBy('id', 'asc').then(data => {
      res.json({
        success: true,
        data: data
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
};

module.exports = {getSites, createSite, updateSite, getSiteDetails};