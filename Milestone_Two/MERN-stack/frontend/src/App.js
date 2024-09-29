import Register from './Register';
import Dashboard from './Dashboard';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1>Welcome to the MERN stack application</h1>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<h1>Welcome to the MERN stack application</h1>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<h1>Welcome to the MERN stack application</h1>} />
      </Routes>
    </Router>
  );
}
