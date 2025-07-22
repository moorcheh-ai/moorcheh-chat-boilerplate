#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

async function setupBoilerplate() {
  const targetDir = process.cwd();
  const templateDir = path.join(__dirname, '../template');

  // Prompt user for project name
  const prompt = inquirer.prompt || inquirer.default.prompt;
  const { projectName } = await prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'my-nextjs-app',
    },
  ]);

  const destDir = path.join(targetDir, projectName);

  try {
    // Check if target directory exists
    if (await fs.pathExists(destDir)) {
      console.error(`Directory ${projectName} already exists. Please choose a different name or delete the existing directory.`);
      process.exit(1);
    }

    // Copy template to target directory
    await fs.copy(templateDir, destDir);
    console.log(`Copied boilerplate to ${destDir}`);

    // Update package.json with project name
    const packageJsonPath = path.join(destDir, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(`Updated package.json with project name: ${projectName}`);

    // Windows-specific note
    if (process.platform === 'win32') {
      console.log('\nNOTE: On Windows, you do NOT need to run chmod. Just use:');
      console.log('  node bin/index.js');
    }

    console.log('Boilerplate setup complete!');
    console.log(`Next steps:\n  1. cd ${projectName}\n  2. npm install\n  3. npm run dev`);
  } catch (err) {
    console.error('Error setting up boilerplate:', err.message);
    process.exit(1);
  }
}

setupBoilerplate();