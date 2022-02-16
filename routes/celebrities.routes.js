// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.post("/celebrities/:id/delete", (req, res) => {
    Celebrity.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect("/celebrities");
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"))

router.post("/celebrities/create", (req, res) => {
    const {name, occupation, catchPhrase} = req.body

    Celebrity.create({name, occupation, catchPhrase})
    .then(() => res.redirect("/celebrities"))
    .catch((error) => {
        console.log(error)
        res.redirect("celebrities/new-celebrity")
    })
})

router.get("/celebrity/:id", (req, res)=>{
    Celebrity.findById(req.params.id)
    .then((celebrity)=>{res.render("celebrities/celebrity-details.hbs", celebrity)})
    .catch((err)=>{console.log(err)})
})

router.get("/celebrities", (req, res) => {
    const {name} = req.body
    Celebrity.find()
    .then((celebrities) => {
        res.render("celebrities/celebrities", {celebrities})
    })
})

module.exports = router;