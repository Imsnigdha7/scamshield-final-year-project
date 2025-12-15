const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Where we'll store community stories on disk
const STORIES_FILE = path.join(__dirname, 'stories.json');
// Where we'll store user accounts on disk
const USERS_FILE = path.join(__dirname, 'users.json');

// In real production, keep this in an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'dev-change-this-secret';



// Middleware
app.use(cors());
app.use(express.json());

// ====== Email Analyzer API ======
app.post('/api/analyze-email', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({
      safe: false,
      message: 'Please provide email text to analyze.',
    });
  }

  const suspiciousWords = ['urgent', 'verify', 'suspended', 'click here', 'prize', 'winner'];
  const lower = text.toLowerCase();
  const hasSuspiciousWords = suspiciousWords.some((word) => lower.includes(word));
  const longEnough = text.length > 20;

  return res.json({
    safe: !hasSuspiciousWords && longEnough,
    message: hasSuspiciousWords
      ? 'This email contains suspicious phrases commonly used in scams.'
      : longEnough
      ? 'This email appears safe, but always verify the sender.'
      : 'Please enter more text for a better analysis.',
  });
});

// ====== Website Checker API ======
app.post('/api/check-website', (req, res) => {
  const { url } = req.body;

  if (!url || url.trim().length === 0) {
    return res.status(400).json({
      safe: false,
      message: 'Please provide a website URL to check.',
    });
  }

  const hasHttps = url.startsWith('https://');
  const hasSuspiciousTLD = url.includes('.tk') || url.includes('.xyz');

  return res.json({
    safe: hasHttps && !hasSuspiciousTLD && url.length > 10,
    message: !hasHttps
      ? 'Warning: This website does not use HTTPS encryption.'
      : hasSuspiciousTLD
      ? 'Caution: This domain extension is commonly used in scams.'
      : 'This website appears to have basic security measures.',
  });
});

// NOTE: Password strength should stay on the frontend for security.
// Never send real passwords to the backend unless you really need to.

// ====== Start server ======
// ====== Community Stories (in memory) ======
// ====== Community Stories (file-backed) ======

// Default stories used only if there is no stories.json yet
const DEFAULT_STORIES = [
  {
    id: 1,
    title: 'Almost Lost $5,000 to Fake Tech Support',
    author: 'Sarah M.',
    // store actual timestamps; you can format on the frontend
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    preview:
      'I received a call claiming my computer was infected. They almost convinced me to give them remote access...',
    body: `I received a call from someone claiming to be from "Microsoft support".
They said my computer was infected and asked me to install remote access software.

Red flags I noticed:
- They called me first (I never requested support)
- They pushed me to act quickly
- They wanted remote access AND payment

I hung up, searched the number online, and saw lots of scam reports. That confirmed it.`,
  },
  {
    id: 2,
    title: 'Spotted a Phishing Email from "My Bank"',
    author: 'John D.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    preview:
      "The email looked exactly like my bank's official emails, but the URL was slightly different...",
    body: `I got an email saying there was a problem with my bank account.
The logo and layout looked real, but the link went to "mybank-secure-login.com" instead of the real bank domain.

I checked:
- The sender email was a random Gmail address
- The URL was wrong when I hovered over the button

I deleted the email and logged into my bank from the official website instead. My account was fine.`,
  },
  {
    id: 3,
    title: 'Package Delivery Scam Text Message',
    author: 'Maria L.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    preview:
      "Got a text saying I had a package waiting, but I wasn't expecting anything. Glad I checked first...",
    body: `I got a text message saying: "Your package is waiting, click here to schedule delivery."
The link was a weird shortened URL and I wasn't expecting any packages.

Instead of clicking:
- I checked my usual delivery apps
- I copied the text into Google and saw people reporting it as a scam

I deleted the message and blocked the number.`,
  },
];

// Helper to load stories from disk (or use defaults if file missing/corrupt)
function loadStoriesFromDisk() {
  try {
    if (fs.existsSync(STORIES_FILE)) {
      const raw = fs.readFileSync(STORIES_FILE, 'utf8');
      if (!raw) return DEFAULT_STORIES.slice();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      console.warn('stories.json did not contain an array, using defaults.');
      return DEFAULT_STORIES.slice();
    }
    // If file doesn't exist, start with defaults and save them
    fs.writeFileSync(STORIES_FILE, JSON.stringify(DEFAULT_STORIES, null, 2), 'utf8');
    return DEFAULT_STORIES.slice();
  } catch (err) {
    console.error('Error loading stories from disk, using defaults:', err);
    return DEFAULT_STORIES.slice();
  }
}

// Helper to save stories to disk
function saveStoriesToDisk(storiesArray) {
  try {
    fs.writeFileSync(STORIES_FILE, JSON.stringify(storiesArray, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving stories to disk:', err);
  }
}

// This is the in-memory copy used at runtime, initialized from disk
let stories = loadStoriesFromDisk();
// ====== Users (file-backed) ======

const DEFAULT_USERS = [
  // Optional seed user (for testing)
  // Password: test1234
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    passwordHash: bcrypt.hashSync('test1234', 10),
  },
];

function loadUsersFromDisk() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, 'utf8');
      if (!raw) return DEFAULT_USERS.slice();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      console.warn('users.json did not contain an array, using defaults.');
      return DEFAULT_USERS.slice();
    }
    // File does not exist, create with defaults
    fs.writeFileSync(USERS_FILE, JSON.stringify(DEFAULT_USERS, null, 2), 'utf8');
    return DEFAULT_USERS.slice();
  } catch (err) {
    console.error('Error loading users from disk, using defaults:', err);
    return DEFAULT_USERS.slice();
  }
}

function saveUsersToDisk(usersArray) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersArray, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving users to disk:', err);
  }
}

let users = loadUsersFromDisk();

// ====== Auth helpers ======

function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  const token = authHeader.substring('Bearer '.length);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// ====== Auth APIs ======

// Register
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  const existing = users.find(u => u.email === normalizedEmail);
  if (existing) {
    return res.status(400).json({ message: 'An account with that email already exists.' });
  }

  const maxId = users.length ? Math.max(...users.map(u => u.id)) : 0;
  const id = maxId + 1;
  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = { id, name: name.trim(), email: normalizedEmail, passwordHash };
  users.push(newUser);
  saveUsersToDisk(users);

  const token = generateToken(newUser);
  return res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken(user);
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});



// Get all stories
// Get all stories
app.get('/api/stories', (req, res) => {
  res.json(stories);
});
// Get a single story by id
app.get('/api/stories/:id', (req, res) => {
  const id = Number(req.params.id);
  const story = stories.find((s) => s.id === id);

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  return res.json(story);
});

// Like / Unlike a story (requires login)
app.post('/api/stories/:id/like', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const story = stories.find((s) => s.id === id);

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  const userId = req.user.id;

  // Ensure likes array exists for older stories
  if (!Array.isArray(story.likes)) {
    story.likes = [];
  }

  const alreadyLiked = story.likes.includes(userId);

  if (alreadyLiked) {
    // Unlike
    story.likes = story.likes.filter((uid) => uid !== userId);
  } else {
    // Like
    story.likes.push(userId);
  }

  saveStoriesToDisk(stories);

  return res.json({
    liked: !alreadyLiked,
    likesCount: story.likes.length,
  });
});

// Add a reply to a story (requires login)
app.post('/api/stories/:id/replies', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const { text } = req.body || {};

  if (!text || !String(text).trim()) {
    return res.status(400).json({ message: 'Reply text is required.' });
  }

  const story = stories.find((s) => s.id === id);
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  if (!Array.isArray(story.replies)) {
    story.replies = [];
  }

  const nextReplyId = story.replies.length
    ? story.replies[story.replies.length - 1].id + 1
    : 1;

  const reply = {
    id: nextReplyId,
    authorId: req.user.id,
    author: req.user.name,
    text: String(text).trim(),
    createdAt: new Date().toISOString(),
  };

  story.replies.push(reply);
  saveStoriesToDisk(stories);

  return res.status(201).json(reply);
});

// Delete a reply (requires login, must be reply author or story author)
app.delete('/api/stories/:storyId/replies/:replyId', authMiddleware, (req, res) => {
  const storyId = Number(req.params.storyId);
  const replyId = Number(req.params.replyId);

  const story = stories.find((s) => s.id === storyId);
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  if (!Array.isArray(story.replies)) {
    story.replies = [];
  }

  const replyIndex = story.replies.findIndex((r) => r.id === replyId);
  if (replyIndex === -1) {
    return res.status(404).json({ message: 'Reply not found' });
  }

  const reply = story.replies[replyIndex];

  // Only reply author OR story author can delete
  const userId = req.user.id;
  const isReplyAuthor = reply.authorId === userId;
  const isStoryAuthor = story.authorId === userId;

  if (!isReplyAuthor && !isStoryAuthor) {
    return res.status(403).json({ message: 'You are not allowed to delete this reply.' });
  }

  story.replies.splice(replyIndex, 1);
  saveStoriesToDisk(stories);

  return res.json({ success: true });
});


// Add a new story (requires login)
app.post('/api/stories', authMiddleware, (req, res) => {
  const { title, what, realization } = req.body;

  if (!title || !what || !realization) {
    return res.status(400).json({
      message: 'Please provide title, what happened, and how you realized it was a scam.',
    });
  }

  const maxId = stories.length ? Math.max(...stories.map((s) => s.id)) : 0;
  const id = maxId + 1;

  const combined = `${what} ${realization}`;
  const preview =
    combined.length > 160 ? combined.slice(0, 157) + '...' : combined;

  const body = `What happened:\n${what}\n\nHow I realized it was a scam:\n${realization}`;


  const newStory = {
    id,
    title,
    authorId: req.user.id,
    author: req.user.name,
    date: new Date().toISOString(),
    preview,
    body,
    likes: [],    // userIds who liked this story
    replies: [],  // list of reply objects
  };


  stories.unshift(newStory);
  saveStoriesToDisk(stories);

  return res.status(201).json(newStory);
});


app.listen(PORT, () => {
  console.log(`ScamShield backend running on http://localhost:${PORT}`);
});

