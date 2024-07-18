#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyMain(targetDir) {
    const mainDir = path.join(__dirname, 'template');
    const spinner = ora({
        text: 'Creating Your zet.js Project. Please wait...',
        color: 'magenta',
        spinner: {
            interval: 100,
            frames: ['.', '..', '...']
        }
    }).start();

    try {
        await fs.ensureDir(targetDir);

        const files = await fs.readdir(mainDir);
        await Promise.all(files.map(async file => {
            const srcPath = path.join(mainDir, file);
            const destPath = path.join(targetDir, file);
            await fs.copy(srcPath, destPath);
        }));

        spinner.succeed(chalk.green(`${chalk.magenta('zet.js')} project created successfully.`));
        console.log();
        const lastPart = path.basename(targetDir);
        console.log(chalk.cyan(`   cd ${lastPart}`));
        console.log(chalk.cyan('   npm install'));
        console.log(chalk.cyan('   npm run dev'));
    } catch (err) {
        spinner.fail(chalk.red('Error creating project, try again!'));
        console.error(chalk.red(`Error: ${err.message}`));
        process.exit(1);
    }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error(chalk.red('Usage: create-zet-app <target-directory>'));
    process.exit(1);
}

const targetDir = path.resolve(process.cwd(), args[0]);
copyMain(targetDir);
