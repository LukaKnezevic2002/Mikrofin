const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mikrofin'
});

conn.connect(err => {
    if (err) {
        console.error('Error connecting to the database', err);
    }else{
        console.log('Connected to the database!');
    }
});

const baseUrl = 'https://mikrofin.com/o-nama/vijesti-i-aktuelnosti';
let start = 0;

async function scrapeData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('.page-header h1').text().trim();
        const descr = $('div[itemprop="articleBody"]').html().trim();
        const image = "https://mikrofin.com/" + $('.entry-image img').attr('src');
        return {title, descr, image};
    } catch (error) {
        console.error(`Error scraping title from ${url}:`, error);
        return null;
    }
}

async function scrapePage(start) {
    try {
        const url = `${baseUrl}?start=${start}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        for (const element of $('.blog article').get()) {
            const link = $(element).find('.entry-image a').attr('href');
            const fullLink = new URL(link, baseUrl).href;
            const data = await scrapeData(fullLink);
            const title = data.title;
            const descr = data.descr;
            const image = data.image;

            const query = 'INSERT INTO products (link, title, descr, image) VALUES (?, ?, ?, ?)';
            conn.query(query, [fullLink, title, descr, image], (err, results) => {
                if (err) {
                    console.error('Error inserting data into database:', err);
                } else {
                    //console.log('Data inserted successfully:', results.insertId);
                }
            });
            //console.log({fullLink, title, descr, image});
        }

        if ($('.blog article').length > 0) {
            await scrapePage(start + 10);
        }
    } catch (error) {
        console.error(error);
    }
}

scrapePage(start);