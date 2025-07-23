#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

async function setupBoilerplate() {
  const targetDir = process.cwd();
  const templateDir = path.join(__dirname, '../template');
  const integrationsDir = path.join(__dirname, '../integrations');

  console.log('🚀 Welcome to Moorcheh Chat Boilerplate!');
  console.log('');

  // Prompt user for project name and integrations
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
      name: 'includeFirecrawl',
      message: '🔥 Would you like to include Firecrawl integration for web scraping?',
      default: false
    }
  ]);

  const { projectName, includeFirecrawl } = answers;
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
    
    // Copy Firecrawl integration if requested
    if (includeFirecrawl && await fs.pathExists(integrationsDir)) {
      const firecrawlDestDir = path.join(destDir, 'integrations');
      await fs.copy(integrationsDir, firecrawlDestDir);
    }
    
    // Clear progress and show completion
    clearInterval(progressInterval);
    process.stdout.write('\r✅ Copied boilerplate files\n');

    // Update package.json with project name
    console.log('📝 Updating project configuration...');
    const packageJsonPath = path.join(destDir, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    
    // Add Firecrawl dependencies if integration is included
    if (includeFirecrawl) {
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies['firecrawl-py'] = '^2.16.1';
      packageJson.dependencies['pandas'] = '^2.0.0';
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts['firecrawl'] = 'python integrations/firecrawl/moorcheh-firecrawl.py';
    }
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log('✅ Updated package.json');

    if (includeFirecrawl) {
      console.log('🔥 Added Firecrawl integration files');
    }

    console.log('');
    console.log('🎉 Boilerplate setup complete!');
    console.log('');
    console.log('📋 Next steps:');
    console.log(`   1. cd ${projectName}`);
    console.log('   2. npm install');
    console.log('   3. See README.md for API configuration');
    if (includeFirecrawl) {
      console.log('   4. Set up Firecrawl integration (see integrations/firecrawl/README.md)');
      console.log('   5. npm run dev');
    } else {
      console.log('   4. npm run dev');
    }
    console.log('');
    console.log('📚 Documentation:');
    console.log('   • API Setup: config/README.md');
    console.log('   • Branding: BRANDING_GUIDE.md');
    console.log('   • Themes & Fonts: customize/README.md');
    if (includeFirecrawl) {
      console.log('   • Firecrawl Integration: integrations/firecrawl/README.md');
    }
    console.log('');
    console.log('🚀 Happy coding!');

  } catch (err) {
    console.error('❌ Error setting up boilerplate:', err.message);
    process.exit(1);
  }
}

setupBoilerplate();