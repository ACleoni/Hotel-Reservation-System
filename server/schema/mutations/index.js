'use strict';

const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);
const mutations = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
    const mutation = require(path.join(__dirname, file));
    mutations[file.slice(0, -3)] = mutation;
    });

module.exports = mutations;