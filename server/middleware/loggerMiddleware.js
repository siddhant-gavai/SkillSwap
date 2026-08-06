const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}
const logFilePath = path.join(logsDir, 'access.log');

const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLine = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms\n`;
        
        // Print to console
        console.log(logLine.trim());
        
        // Append to log file
        fs.appendFile(logFilePath, logLine, (err) => {
            if (err) {
                console.error('Error writing to access log file:', err);
            }
        });
    });
    next();
};

module.exports = logger;
