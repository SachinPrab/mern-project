import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import NavBar from "./components/Navbar.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import { AuthProvider, useAuth } from "./context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users from login/signup to home
  if (isAuthenticated && window.location.pathname.match(/login|signup/)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreatePage/>
          </ProtectedRoute>
        } />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
