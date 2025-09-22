import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TasksPage } from './pages/TasksPage';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="App">
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#059669',
                  },
                },
                error: {
                  style: {
                    background: '#DC2626',
                  },
                },
              }}
            />

            {/* Routes */}
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route
                path={ROUTES.TASKS}
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Default redirect */}
              <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.TASKS} replace />} />
              
              {/* Catch all - redirect to tasks */}
              <Route path="*" element={<Navigate to={ROUTES.TASKS} replace />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
