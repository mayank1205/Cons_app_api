const db = require('../db/db');


const createSite = (req, res) => {
    const site = req.body;
    site.user_id = req.userid;
    site.created_by = req.username;
    site.updated_by = req.username;
    db("sites").insert(site).returning("*")
    .then(async (resp) => {
      req.body.id = resp[0].id;
      createSiteMember(req,res);
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

  const createSiteMember = (req,res) => {
    let site_members = {};
    site_members.updated_by = req.username;
    site_members.created_by = req.username;
    site_members.site_id = req.body.id;
    site_members.member_id = req.userid;
    site_members.role = 'Admin';
    db("site_members").insert(site_members).returning("*")
    .then((resp) => {
      //
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
    site.updated_by = req.username;
    site.updated_at = new Date();
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