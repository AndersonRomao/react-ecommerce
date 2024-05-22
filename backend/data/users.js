const bcrypt = require('bcrypt')

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jhon Doe',
        email: 'jhon@example.com',
        password: bcrypt.hashSync('123456', 10),

    }
]

module.exports = users;