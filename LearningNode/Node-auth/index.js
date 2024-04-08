const cl = console.log.bind(console);
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUserOnly } = require('./middleware/auth')
const userRoutes = require('./routes/user');
const users = require('./MOCK_DATA.json')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRoutes);
app.get("/users", restrictToLoggedInUserOnly, (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});

app.listen(3000, () => {
    cl('Server started on http://localhost:3000');
});
