const { execSync } = require('child_process');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');

const container = '`$web';

execSync(
  `az storage blob upload-batch -s "${distPath}" -d ${container} --account-name stgsandfrontendnevks001 --overwrite`,
  {
    stdio: 'inherit',
    shell: 'powershell.exe',
  }
);
