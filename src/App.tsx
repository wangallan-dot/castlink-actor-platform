import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ActorDashboard } from './pages/ActorDashboard';
import { ActorDetailPage } from './pages/ActorDetailPage';
import { ActorsPage } from './pages/ActorsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProducerDashboard } from './pages/ProducerDashboard';
import { ProfileEditorPage } from './pages/ProfileEditorPage';
import { RoleDetailPage } from './pages/RoleDetailPage';
import { RolesPage } from './pages/RolesPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/actors" element={<ActorsPage />} />
          <Route path="/actors/:actorId" element={<ActorDetailPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/roles/:roleId" element={<RoleDetailPage />} />
          <Route path="/dashboard/actor" element={<ActorDashboard />} />
          <Route path="/dashboard/producer" element={<ProducerDashboard />} />
          <Route path="/profile/edit" element={<ProfileEditorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
