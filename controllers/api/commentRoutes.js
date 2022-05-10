const express = require("express");
const router = express.Router();
const {User,Comment} = require("../../models");
const withAuth = require('../../util/auth')

//find all
router.get("/", (req, res) => {
  Comment.findAll({include:[User, Blog]})
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id,{include: [User, Blog]})
    .then(dbComment => {
      res.json(dbComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create Comment
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"ya gotta login to create a Comment post!"})
}
  Comment.create({
    body:req.body.body,
    UserId:req.session.user.id
  })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update Comment
router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please log in!"})
  }
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedComment => {
    res.json(updatedComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//delete a Comment
router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please log in!"})
  }
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(delComment => {
    res.json(delComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
