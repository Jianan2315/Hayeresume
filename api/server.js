const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3824;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
