const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting BrauComputer Development...\n');

// Start React Dev Server
console.log('📦 Starting React Dev Server...');
const reactProcess = spawn('npm', ['run', 'dev:react'], {
  stdio: 'inherit',
  shell: true
});

// Warte 15 Sekunden, dann starte Electron
setTimeout(() => {
  console.log('⚡ Starting Electron...');
  const electronProcess = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true
  });

  // Cleanup bei Exit
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    reactProcess.kill();
    electronProcess.kill();
    process.exit(0);
  });

  electronProcess.on('close', () => {
    reactProcess.kill();
    process.exit(0);
  });
}, 15000);

reactProcess.on('close', () => {
  process.exit(0);
});
