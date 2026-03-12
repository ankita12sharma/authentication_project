const express = require("express");
const {
  getregisterUsers,
  createregisterUsers,
  updateregisterUsers,
  deleteregisterUsers,
} = require("../Controllers/RegisterController");

const router = new express.Router();
router.get("/getusers", getregisterUsers);
router.post("/registeruser", createregisterUsers);
router.put(`/editreg/:id`, updateregisterUsers);
router.delete(`/delreg/:id`, deleteregisterUsers);

module.exports = router;
