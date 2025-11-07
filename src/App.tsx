import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from './amplifyconfiguration';
import Login from './pages/Login';
import Home from './pages/Home';
import UpdateEmail from './pages/UpdateEmail';
import './App.css';

// Amplifyの設定を初期化
Amplify.configure(amplifyConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-email" element={<UpdateEmail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
