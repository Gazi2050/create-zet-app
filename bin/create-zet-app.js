#!/usr/bin/env node

const { Command } = require('commander');
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
        console.log(`Creating a new zet.js project: ${projectName}`);

        try {
            const projectPath = path.resolve(process.cwd(), projectName);

            // Ensure the project directory exists
            await fs.ensureDir(projectPath);
            console.log(`Project directory created at ${projectPath}`);

            // Change to the project directory
            process.chdir(projectPath);
            console.log(`Changed directory to ${projectPath}`);

            // Copy template files
            const templatePath = path.resolve(__dirname, '..', 'src', 'templates', 'basic');
            await fs.copy(templatePath, projectPath);
            console.log('Template files copied.');

            // Read the package.json template
            const packageJsonPath = path.resolve(projectPath, 'package.json');
            let packageJson = {
                name: projectName,
                version: '1.0.0',
                dependencies: {}
            };

            // Fetch the latest version of zet.js from npm
            const { stdout: zetVersion } = await execPromise('npm show zet.js version');
            packageJson.dependencies['zet.js'] = `^${zetVersion.trim()}`;

            // Write the updated package.json back to the file system
            await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
            console.log('Package.json updated with dependencies.');

            // Change to the project directory (again, in case of any issues)
            process.chdir(projectPath);

            // Install dependencies using `npm i`
            console.log('Installing dependencies...');
            await execPromise('npm i');
            console.log('Dependencies installed successfully.');

            // Display next steps
            console.log(`\nNext steps:\n`);
            console.log(`cd ${projectName}`);
            console.log('npm run dev');

        } catch (err) {
            console.error('Error creating project:', err.message || err);
        }
    });

program.parse(process.argv);
