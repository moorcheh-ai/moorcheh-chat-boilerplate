#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

async function setupBoilerplate() {
  const targetDir = process.cwd();
  const templateDir = path.join(__dirname, '../template');

  console.log('🚀 Welcome to Moorcheh Chat Boilerplate!');
  console.log('');

  // Prompt user for project name and git initialization
  const prompt = inquirer.prompt || inquirer.default.prompt;
  const answers = await prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'my-chat-app',
      validate: (input) => {
        if (!input.trim()) {
          return 'Project name cannot be empty';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize Git repository?',
      default: true
    }
  ]);

  const { projectName, initGit } = answers;
  const destDir = path.join(targetDir, projectName);

  try {
    // Check if target directory exists
    if (await fs.pathExists(destDir)) {
      console.error(`❌ Directory "${projectName}" already exists. Please choose a different name or delete the existing directory.`);
      process.exit(1);
    }

    console.log('');
    console.log('📦 Creating your chat application...');
    console.log('');

    // Show progress indicator
    const progressChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let progressIndex = 0;
    
    const showProgress = (message) => {
      process.stdout.write(`\r${progressChars[progressIndex]} ${message}`);
      progressIndex = (progressIndex + 1) % progressChars.length;
    };

    // Start progress animation
    const progressInterval = setInterval(() => {
      showProgress('Copying boilerplate files...');
    }, 100);

    // Copy template to target directory
    await fs.copy(templateDir, destDir);
    
    // Clear progress and show completion
    clearInterval(progressInterval);
    process.stdout.write('\r✅ Copied boilerplate files\n');

    // Update package.json with project name
    console.log('📝 Updating project configuration...');
    const packageJsonPath = path.join(destDir, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log('✅ Updated package.json');

    // Initialize Git repository if requested
    if (initGit) {
      console.log('');
      console.log('🔧 Initializing Git repository...');
      try {
        process.chdir(destDir);
        execSync('git init', { stdio: 'inherit' });
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "Initial commit from Moorcheh Chat Boilerplate"', { stdio: 'inherit' });
        console.log('✅ Git repository initialized');
        process.chdir(targetDir);
      } catch (gitError) {
        console.log('⚠️  Failed to initialize Git repository:', gitError.message);
        console.log('   You can initialize it manually with: git init');
        process.chdir(targetDir);
      }
    }

    console.log('');
    console.log('🎉 Boilerplate setup complete!');
    console.log('');
    console.log('📋 Next steps:');
    console.log(`   1. cd ${projectName}`);
    console.log('   2. npm install');
    console.log('   3. See README.md for API configuration');
    if (!initGit) {
      console.log('   4. (Optional) Initialize Git: git init && git add . && git commit -m "Initial commit"');
      console.log('   5. npm run dev');
    } else {
      console.log('   4. npm run dev');
    }
    console.log('');
    console.log('📚 Documentation:');
    console.log('   • API Setup: config/README.md');
    console.log('   • Branding: BRANDING_GUIDE.md');
    console.log('   • Themes & Fonts: customize/README.md');
    console.log('');
    console.log('🚀 Happy coding!');

  } catch (err) {
    console.error('❌ Error setting up boilerplate:', err.message);
    process.exit(1);
  }
}

setupBoilerplate();