#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
    .name('create-zet-app')
    .description('CLI to create a new zet.js application')
    .version('1.0.0')
    .argument('<project-name>', 'name of the project')
    .action(async (projectName) => {
        console.log(chalk.green(`Creating a new zet.js project: ${projectName}`));

        try {
            // Create the project directory
            const projectPath = path.join(process.cwd(), projectName);
            await fs.ensureDir(projectPath);

            // Change to the project directory
            process.chdir(projectPath);

            // Copy template files (optional step)
            // For simplicity, assume you have a template structure ready in src/templates/basic/

            const templatePath = path.join(__dirname, '..', 'src', 'templates', 'basic');
            await fs.copy(templatePath, projectPath);

            console.log(chalk.green(`Project ${projectName} created successfully at ${projectPath}`));

            // Install zet-js
            console.log(chalk.blue('Installing zet.js...'));
            exec('npm install zet.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(chalk.red(`Error installing zet.js: ${error.message}`));
                    return;
                }
                if (stderr) {
                    console.error(chalk.red(`stderr: ${stderr}`));
                    return;
                }
                console.log(chalk.green(stdout));
                console.log(chalk.green('zet.js installed successfully.'));

                // Run development server
                console.log(chalk.blue('Starting development server...'));
                exec('npm run dev', (error, stdout, stderr) => {
                    if (error) {
                        console.error(chalk.red(`Error starting development server: ${error.message}`));
                        return;
                    }
                    if (stderr) {
                        console.error(chalk.red(`stderr: ${stderr}`));
                        return;
                    }
                    console.log(chalk.green(stdout));
                    console.log(chalk.green('Development server started.'));
                });
            });

        } catch (err) {
            console.error(chalk.red('Error creating project:', err));
        }
    });

program.parse(process.argv);
