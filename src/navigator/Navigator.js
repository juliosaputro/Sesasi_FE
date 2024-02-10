import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashUser from "../pages/user/DashUser";
import AdminNotes from "../pages/admin/notes/AdminNotes";
import AdminUsers from "../pages/admin/users/AdminUsers";
import CreateNotes from "../pages/CreateNotes";
import AdminEditUser from "../pages/admin/users/AdminEditUser";
import { AuthProvider } from "../auth/AuthContext";
import { useSelector } from "react-redux";

const Navigator = () => {
  const user = useSelector((s) => s.user);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/user-note" element={user.isAuthenticated ? <DashUser /> : <Navigate to="/sign-in" />} />
          <Route path="/user-note/create" element={user.isAuthenticated ? <CreateNotes /> : <Navigate to="/sign-in" />} />
          <Route path="/user-note/edit/:Id" element={user.isAuthenticated ? <CreateNotes /> : <Navigate to="/sign-in" />} />
          <Route path="/admin-note" element={user.isAuthenticated ? <AdminNotes /> : <Navigate to="/sign-in" />} />
          <Route path="/admin-note/create" element={user.isAuthenticated ? <CreateNotes /> : <Navigate to="/sign-in" />} />
          <Route path="/admin-note/edit/:Id" element={user.isAuthenticated ? <CreateNotes /> : <Navigate to="/sign-in" />} />
          <Route path="/admin-user" element={user.isAuthenticated ? <AdminUsers /> : <Navigate to="/sign-in" />} />
          <Route path="/admin-user/edit/:Id" element={user.isAuthenticated ? <AdminEditUser /> : <Navigate to="/sign-in" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default Navigator;
