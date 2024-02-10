import React from "react";
import GlobalHeader from "../../../components/GlobalHeader";
import ContentLayout from "../../../components/ContentLayout";
import EditUser from "../../../components/form/EditUser";
import Navbar from "../../../components/Navbar";
import { useLocation } from "react-router-dom";

function AdminEditUser() {
  const location = useLocation();
  const { action } = location.state || {};
  return (
    <>
      <Navbar />
      <GlobalHeader title={`${action} User`} />
      <ContentLayout>
        <EditUser />
      </ContentLayout>
    </>
  );
}

export default AdminEditUser;
