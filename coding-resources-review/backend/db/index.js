const pg = require('pg')// imports the pg
// initalizing the client 
const client = new pg.Client( process.env.DATABASE_URL || 'postgres://janayacooper@localhost:5432/coding_review_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const app = express();
const express = require('express');

// middleware 