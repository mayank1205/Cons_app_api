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
    let site_member = {};
    site_members.updated_by = req.username;
    site_members.created_by = req.username;
    site_members.site_id = req.body.id;
    site_members.member_id = req.userid;
    site_members.role = 'Admin';
    db("site_members").insert(site_member).returning("*")
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
    let userid = req.userid;
    db.select("*").from("site_members").where("member_id", "=",userid).orderBy('id', 'asc').then(data => {
      if(data.length < 1){
        res.json({
          success: false,
          data: [],
          message: "No Access to update site."
        });
      }
      else {
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
      }
    }).catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
  };

const getSites = (req, res) => {
    let userid = req.userid;
    console.log(userid)
    db.select("sites.*").from("site_members").innerJoin('sites', 'sites.id', 'site_members.site_id').where("member_id", "=",userid).orderBy('id', 'asc').then(data => {
      if(data.length < 1){
        res.json({
          success: true,
          data: [],
          message: "No Sites Found."
        });
      }
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

  let userid = req.userid;
    console.log(userid)
    db.select("sites.*").from("site_members").innerJoin('sites', 'sites.id', 'site_members.site_id').where("member_id", "=",userid).andWhere("sites.id", "=", req.params.id).orderBy('id', 'asc').then(data => {
      if(data.length < 1){
        res.json({
          success: false,
          data: null,
          message: "No Site Found with this ID."
        });
      }
      res.json({
        success: true,
        data: data[0]
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
    console.log("getSiteDetails")
};


const getSiteMembers = (req, res) => {
  let siteid = req.params.id;
  db.select(["users.name", "users.email", "users.id", "users.mobile"]).from("site_members").innerJoin('users', 'users.id', 'site_members.member_id').where("site_members.site_id", "=",siteid).orderBy('users.id', 'asc').then(data => {
    if(data.length < 1){
      res.json({
        success: true,
        data: [],
        message: "No members Found."
      });
    }
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

module.exports = {getSites, createSite, updateSite, getSiteDetails, getSiteMembers};