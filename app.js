const express = require('express');
const data = require('./data.json');
const { projects } = data;

const app = express();

app.use('/static', express.static('public'));


app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug', { projects });
    console.log('app running');
});

app.get('/about', (req, res) => {
    res.render('about.pug');
});

app.get('/project/:id', (req,res) => {
    const { id } = req.params;
    const { project_name } = projects[id];
    const { description } = projects[id];
    const { live_link } = projects[id];
    const { github_link } = projects[id];
    const { technologies } = projects[id];
    const { image_urls } = projects[id];

    const projectData = { project_name, description, live_link, github_link, technologies, image_urls };

    res.render('project', projectData);
    console.log(projectData)
});

app.listen(3000, () => {
    console.log(data.projects);
});