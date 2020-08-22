/** @format */

const { check } = require("express-validator");

const credentialsVaidation = [
  check("telephoneNumber", "please include a valid telephone number").exists(),
  check("password", "password is required").exists(),
];

module.exports = { credentialsVaidation };
