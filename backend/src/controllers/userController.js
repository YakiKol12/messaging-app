const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // Respond with the new user (omit password)
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Respond with the user (omit password)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user (omit password)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }
    
    users.forEach(user => {
      delete user.password; 
      delete user.updatedAt;
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(id, 10) }
    });

    res.json({ message: 'User deleted successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  deleteUserById
};
