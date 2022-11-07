const express = require('express');
const { check } = require('express-validator');
const  AuthController  = require('../controller/AuthController');
const router = require('express').Router();

router.get('/' , (_, res)=>{
  res.render("index");
});

router.get('/login', (_ , res)=>{
  res.render("login", {errors:false});
});
router.get("/logout", AuthController.logout);
router.post("/login", [check("username","Username must not be empty!").notEmpty({ignore_whitespace:true}), check("password", "Password not must be empty!").notEmpty({ignore_whitespace:true})], AuthController.login);



module.exports  = router;