import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfilesListPage } from './pages/ProfilesListPage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilesListPage />} />
        <Route path="/profile/:id" element={<ProfileDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
