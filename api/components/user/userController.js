const User = require('./userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const VALID_INVITE_CODE = "6196";
const PUBLIC_KEY = "ks1t2b83"

exports.createUser = async (req, res) => {
    try {
        const { email, password, code } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'This email is already registered. Please use a different email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = code === VALID_INVITE_CODE ? 'admin' : 'user';
        const user = new User({ email: email, password:hashedPassword, role: role });

        await user.save();
        res.status(201).json({ message: 'User created successfully.', email: user.email });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An unexpected server error occurred. Please try again later.' });
    }
};

exports.validateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password.');

        const token = jwt.sign({ userId: user._id, role: user.role }, PUBLIC_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login error:', error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).send('Access denied.');
        const users = await User.find();
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Users retrieval error:', error });
    }
};

exports.getUser = async (req, res) => {
    try {
        if (!req.user.role) {
            return res.status(403).send('Access denied.');
        }
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json({ message: 'Personal info retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Personal info retrieval error:', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).send('Access denied.');
        const deleteOperation = await User.findByIdAndDelete(req.user.userId);
        if (!deleteOperation) {
            return res.status(404).json({ message: 'User not found.' }); // If user does not exist
        }
        res.status(200).json({ message: 'User has been deleted.'});
    } catch (error) {
        res.status(500).json({ message: 'Delete error:', error });
    }
};

exports.logout = async (req, res) => {
    try {
        localStorage.removeItem('token');
        window.location.href = '/login'
        res.status(200).json({ message: 'User has logged out.'});
    } catch (error) {
        res.status(500).json({ message: 'Logout error:', error });
    }
};

exports.updatePass = async (req, res) => {
    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both old and new passwords are required.' });
        }

        // Find the authenticated user
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isCurrent = await bcrypt.compare(currentPassword, user.password);
        if(!isCurrent) return res.status(403).send('Access denied.');
        const isDup = await bcrypt.compare(newPassword, user.password);
        if (isDup) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({ message: 'Successfully updated.'});
    } catch (error) {
        res.status(500).json({ message: 'Update error:', error });
    }
};
