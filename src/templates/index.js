const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const createProject = async (projectName) => {
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates', 'basic');

    try {
        await fs.copy(templatePath, projectPath);
        console.log(chalk.green(`Project ${projectName} created successfully at ${projectPath}`));
    } catch (err) {
        console.error(chalk.red('Error creating project:', err));
    }
};

module.exports = { createProject };
