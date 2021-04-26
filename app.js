const express = require('express');
const data = require('./data.json');
const { projects } = data;

const app = express();

app.use('/static', express.static('public'));


app.set('view engine', 'pug');

/**
*  Renders the homepage
*/
app.get('/', (req, res) => {
    res.render('index.pug', { projects });
});

/**
 * Renders the About page
 */
app.get('/about', (req, res, next) => {
    res.render('about.pug');
});

/**
 * Renders the project pages and creates a 404 if an invalid
 * project id is in the param
 */
app.get('/project/:id', (req,res,next) => {
    const { id } = req.params;

    if (projects[id]) {
        const { project_name } = projects[id];
        const { description } = projects[id];
        const { live_link } = projects[id];
        const { github_link } = projects[id];
        const { technologies } = projects[id];
        const { image_urls } = projects[id];

        const projectData = { project_name, description, live_link, github_link, technologies, image_urls };

        res.render('project', projectData);
        console.log(projectData)
    } else {
        const err = new Error('Not Found!');
        err.status = 404;
        console.log(`There has been a ${err.status} error`)
        next(err);
    }
});

/**
 * Creates a 404 error and renders the 'page-not-found' template
 */
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'This page does not exist';
    console.log(`There has been a ${err.status} error`)
    res.render('page-not-found', { err });
});

/**
 * Global error catch. Renders 'page-not-found' template for a 404.
 * Renders the 'error' template for other errors.
 */
app.use((err, req, res, next) => {
   if (err.status === 404) {
       console.log(`There has been a ${err.status} error`)
       res.status(404).render('page-not-found', { err });
   } else {
       err.message = err.message || `There has been a server error.`;
       console.log(`There has been a ${err.status} error`)
       res.status(err.status || 500).render('error', { err });
   }
});

app.listen(3000, () => {
    console.log(data.projects);
});