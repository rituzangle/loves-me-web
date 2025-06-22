const fs = require('fs');
const path = require('path');

// Function to make package.json editable
function makeEditable() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  try {
    fs.chmodSync(packagePath, 0o644);
    console.log('✅ package.json is now editable (chmod 644)');
  } catch (error) {
    console.error('❌ Error making package.json editable:', error.message);
  }
}

// Function to protect package.json
function protect() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  try {
    fs.chmodSync(packagePath, 0o444);
    console.log('✅ package.json is now protected (chmod 444)');
  } catch (error) {
    console.error('❌ Error protecting package.json:', error.message);
  }
}

// Function to view package.json content
function view() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  try {
    const content = fs.readFileSync(packagePath, 'utf8');
    console.log('📄 Current package.json content:');
    console.log('=' .repeat(50));
    console.log(content);
    console.log('=' .repeat(50));
  } catch (error) {
    console.error('❌ Error reading package.json:', error.message);
  }
}

// Function to backup package.json
function backup() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const backupPath = path.join(__dirname, '..', 'package.json.backup');
  try {
    const content = fs.readFileSync(packagePath, 'utf8');
    fs.writeFileSync(backupPath, content);
    console.log('✅ package.json backed up to package.json.backup');
  } catch (error) {
    console.error('❌ Error backing up package.json:', error.message);
  }
}

// Function to restore from backup
function restore() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const backupPath = path.join(__dirname, '..', 'package.json.backup');
  try {
    if (!fs.existsSync(backupPath)) {
      console.error('❌ No backup file found (package.json.backup)');
      return;
    }
    
    // Make editable first
    fs.chmodSync(packagePath, 0o644);
    
    const content = fs.readFileSync(backupPath, 'utf8');
    fs.writeFileSync(packagePath, content);
    
    // Protect again
    fs.chmodSync(packagePath, 0o444);
    
    console.log('✅ package.json restored from backup and protected');
  } catch (error) {
    console.error('❌ Error restoring package.json:', error.message);
  }
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case 'edit':
    makeEditable();
    break;
  case 'protect':
    protect();
    break;
  case 'view':
    view();
    break;
  case 'backup':
    backup();
    break;
  case 'restore':
    restore();
    break;
  default:
    console.log('📋 Package.json Management Tool');
    console.log('');
    console.log('Usage: node scripts/edit-package.js <command>');
    console.log('');
    console.log('Commands:');
    console.log('  edit     - Make package.json editable (chmod 644)');
    console.log('  protect  - Protect package.json from changes (chmod 444)');
    console.log('  view     - Display current package.json content');
    console.log('  backup   - Create a backup of package.json');
    console.log('  restore  - Restore package.json from backup');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/edit-package.js edit');
    console.log('  node scripts/edit-package.js view');
    console.log('  node scripts/edit-package.js protect');
}