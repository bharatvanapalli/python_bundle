/**
 * Pipeline Sanity Check - AlloyDB Query Automation (Node.js)
 * 
 * Uses bundled psql.exe and cloud-sql-proxy.exe
 */
const { execSync } = require('child_process');
const path = require('path');

const bundleDir = path.join(__dirname, 'bundle');
const psqlPath = path.join(bundleDir, 'bin', 'psql.exe');
const proxyPath = path.join(bundleDir, 'bin', 'cloud-sql-proxy.exe');
const pythonPath = path.join(bundleDir, 'python', 'python.exe');

function runPsqlQuery(host = '127.0.0.1', port = 5432, user = 'postgres', dbname = 'postgres', query = 'SELECT 1 AS sanity_check;') {
    console.log(Executing query with bundled psql: );
    try {
        const cmd = "" -h System.Management.Automation.Internal.Host.InternalHost -p  -U  -d  -c "";
        const result = execSync(cmd, { encoding: 'utf8' });
        console.log('Result:\n', result);
        return result;
    } catch (err) {
        console.error('Failed to execute psql query:', err.message);
    }
}

if (require.main === module) {
    console.log('=== Node.js Automation with Bundled Tools ===');
    console.log(psql path: );
    console.log(cloud-sql-proxy path: );
    console.log(python path: );
    
    // Example usage:
    // runPsqlQuery('127.0.0.1', 5432, 'postgres', 'postgres', 'SELECT version();');
}

module.exports = { runPsqlQuery, psqlPath, proxyPath, pythonPath };
