'use strict';

const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);
const graphql   = require('graphql');
const types     = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
    const type = require(path.join(__dirname, file));
    types[file.slice(0, -3)] = type;
    });

module.exports = types;