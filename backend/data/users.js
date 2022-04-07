import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Shoeb',
        email: 'shoeb@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Shahriyar',
        email: 'shahriyar@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Krupali',
        email: 'krupali@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users