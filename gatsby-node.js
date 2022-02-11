const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")
const fs = require("fs");
const fetch = require('cross-fetch')

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

exports.createPages = async ({ graphql, actions, reporter }) => {


    fetch('https://cdn.heapanalytics.com/js/heap-2943585873.js')
        .then(response => response.text())
        .then(data => {
            const dateObj = new Date();
            const month = dateObj.getUTCMonth() + 1; //months from 1-12
            const day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();

            const scriptHash = `${year}-${month}-${day}`;
            ensureDirectoryExistence(`./public/heap.com/script.js`)
            fs.writeFileSync(`./public/heap.com/script.js`, data);
        }).catch(error => {
            console.log('error fetch', error)
        })
};