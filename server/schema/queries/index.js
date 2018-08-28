'use strict';

const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);
const graphql   = require('graphql');
const queries     = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
    const query = require(path.join(__dirname, file));
    queries[file.slice(0, -3)] = query;
    });

module.exports = queries;