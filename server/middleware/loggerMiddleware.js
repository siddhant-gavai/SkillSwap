const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}
const logFilePath = path.join(logsDir, 'access.log');

// Create a write stream for better write performance and resource reuse
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

logStream.on('error', (err) => {
    console.error('Logging write stream error:', err);
});

const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        
        // Sanitize sensitive info in request url (e.g., tokens or passwords if any)
        let sanitizedUrl = req.originalUrl;
        sanitizedUrl = sanitizedUrl.replace(/(token|password|secret)=([^&]+)/gi, '$1=[REDACTED]');
        
        const logLine = `[${new Date().toISOString()}] ${req.method} ${sanitizedUrl} ${res.statusCode} - ${duration}ms\n`;
        
        // Print to console
        console.log(logLine.trim());
        
        // Write to stream
        logStream.write(logLine);
    });
    next();
};

module.exports = logger;
