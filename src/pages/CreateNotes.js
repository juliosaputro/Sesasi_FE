import React from "react";
import GlobalHeader from "../components/GlobalHeader";
import ContentLayout from "../components/ContentLayout";
import CreateNote from "../components/form/CreateNote";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function CreateNotes() {
  const location = useLocation();
  const { action } = location.state || {};
  return (
    <>
      <Navbar />
      <GlobalHeader title={`${action} Note`} />
      <ContentLayout>
        <CreateNote />
      </ContentLayout>
    </>
  );
}

export default CreateNotes;
