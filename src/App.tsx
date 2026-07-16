import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IdentityProvider } from './context/IdentityProvider';
import { ActorDashboard } from './pages/ActorDashboard';
import { ActorDetailPage } from './pages/ActorDetailPage';
import { ActorsPage } from './pages/ActorsPage';
import { HomePage } from './pages/HomePage';
import { MessagesPage } from './pages/MessagesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProducerDashboard } from './pages/ProducerDashboard';
import { ProfileEditorPage } from './pages/ProfileEditorPage';
import { RoleDetailPage } from './pages/RoleDetailPage';
import { RolesPage } from './pages/RolesPage';
import './App.css';

export default function App() {
  return (
    <IdentityProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/actors/:actorId" element={<ActorDetailPage />} />
            <Route path="/recruitments" element={<RolesPage />} />
            <Route path="/recruitments/:roleId" element={<RoleDetailPage />} />
            <Route path="/roles" element={<Navigate to="/recruitments" replace />} />
            <Route path="/roles/:roleId" element={<RoleDetailPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/applications" element={<ActorDashboard />} />
            <Route path="/recruitment/manage" element={<ProducerDashboard />} />
            <Route path="/dashboard/actor" element={<ActorDashboard />} />
            <Route path="/dashboard/producer" element={<ProducerDashboard />} />
            <Route path="/profile/edit" element={<ProfileEditorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </IdentityProvider>
  );
}
