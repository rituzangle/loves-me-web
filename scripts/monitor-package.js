const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const backupPath = path.join(__dirname, '..', 'package.json.backup');
const lockPath = path.join(__dirname, '..', '.package-lock');

// Create a comprehensive backup
function createBackup() {
  try {
    const content = fs.readFileSync(packagePath, 'utf8');
    fs.writeFileSync(backupPath, content);
    fs.writeFileSync(lockPath, Date.now().toString());
    console.log('✅ Package backup created');
    return true;
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    return false;
  }
}

// Validate package.json integrity
function validatePackage() {
  try {
    const content = fs.readFileSync(packagePath, 'utf8');
    const parsed = JSON.parse(content);
    
    // Check for required fields
    const required = ['name', 'main', 'version', 'dependencies', 'devDependencies'];
    const missing = required.filter(field => !parsed[field]);
    
    if (missing.length > 0) {
      console.error('❌ Package.json missing required fields:', missing);
      return false;
    }
    
    // Check file size (should be reasonable)
    if (content.length < 500) {
      console.error('❌ Package.json appears truncated (too small)');
      return false;
    }
    
    console.log('✅ Package.json validation passed');
    return true;
  } catch (error) {
    console.error('❌ Package.json validation failed:', error.message);
    return false;
  }
}

// Restore from backup if needed
function restoreIfNeeded() {
  if (!validatePackage()) {
    console.log('🔄 Attempting to restore from backup...');
    try {
      if (fs.existsSync(backupPath)) {
        // Make writable
        fs.chmodSync(packagePath, 0o644);
        
        // Restore content
        const backupContent = fs.readFileSync(backupPath, 'utf8');
        fs.writeFileSync(packagePath, backupContent);
        
        // Protect again
        fs.chmodSync(packagePath, 0o444);
        
        console.log('✅ Package.json restored from backup');
        return true;
      } else {
        console.error('❌ No backup available for restoration');
        return false;
      }
    } catch (error) {
      console.error('❌ Restoration failed:', error.message);
      return false;
    }
  }
  return true;
}

// Monitor and protect
function monitor() {
  console.log('🔍 Starting package.json monitoring...');
  
  // Initial backup and validation
  createBackup();
  
  // Watch for changes
  fs.watchFile(packagePath, { interval: 1000 }, (curr, prev) => {
    console.log('📝 Package.json changed, validating...');
    
    setTimeout(() => {
      if (!restoreIfNeeded()) {
        console.error('❌ Failed to maintain package.json integrity');
      }
    }, 100);
  });
  
  // Periodic validation
  setInterval(() => {
    restoreIfNeeded();
  }, 5000);
  
  console.log('✅ Package monitoring active');
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case 'monitor':
    monitor();
    break;
  case 'validate':
    validatePackage();
    break;
  case 'restore':
    restoreIfNeeded();
    break;
  case 'backup':
    createBackup();
    break;
  default:
    console.log('📋 Package Monitor Tool');
    console.log('');
    console.log('Usage: node scripts/monitor-package.js <command>');
    console.log('');
    console.log('Commands:');
    console.log('  monitor   - Start continuous monitoring');
    console.log('  validate  - Check package.json integrity');
    console.log('  restore   - Restore from backup if corrupted');
    console.log('  backup    - Create fresh backup');
}