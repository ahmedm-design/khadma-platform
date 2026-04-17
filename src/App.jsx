import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import PageLoader from './components/common/PageLoader';

// Lazy-loaded pages
const Home            = lazy(() => import('./pages/Home'));
const Categories      = lazy(() => import('./pages/Categories'));
const CategoryDetail  = lazy(() => import('./pages/CategoryDetail'));
const Providers       = lazy(() => import('./pages/Providers'));
const ProviderProfile = lazy(() => import('./pages/ProviderProfile'));
const Login           = lazy(() => import('./pages/Login'));
const Register        = lazy(() => import('./pages/Register'));
const SearchResults   = lazy(() => import('./pages/SearchResults'));
const NotFound        = lazy(() => import('./pages/NotFound'));

// Dashboards
const UserDashboard     = lazy(() => import('./pages/dashboard/UserDashboard'));
const ProviderDashboard = lazy(() => import('./pages/dashboard/ProviderDashboard'));
const AdminDashboard    = lazy(() => import('./pages/dashboard/AdminDashboard'));

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '12px',
            fontFamily: 'inherit',
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public */}
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<CategoryDetail />} />
            <Route path="providers" element={<Providers />} />
            <Route path="providers/:id" element={<ProviderProfile />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected — Seeker */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute roles={['seeker']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected — Provider */}
            <Route
              path="provider-dashboard"
              element={
                <ProtectedRoute roles={['provider']}>
                  <ProviderDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected — Admin */}
            <Route
              path="admin/*"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
