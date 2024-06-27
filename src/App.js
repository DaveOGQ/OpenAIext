import React, { useEffect, useState } from "react";
import Generator from "./pages/Generator";
import "./index.css";
import Profile from "./pages/Profile";
import { Routes } from "./utils/routes";
import { loadData } from "./utils/localStorage";

function App() {
  //these state variables are used trhought the application so it is important to declare them here so thye can be used in the subsequent child components
  const [page, setPage] = useState();
  const [resume, setResume] = useState("resume test");
  const [openAIkey, setOpenAIkey] = useState("openAItest");

  useEffect(() => {
    const fetchLocalData = async () => {
      const fetchedResume = await loadData("resume");
      const fetchedOpenAIkey = await loadData("openAIkey");

      setResume(fetchedResume);
      setOpenAIkey(fetchedOpenAIkey);
    };

    fetchLocalData();
  }); //runs code upon refresh

  switch (page) {
    case Routes.GENERATOR:
      return (
        <Generator setPage={setPage} resume={resume} openAIkey={openAIkey} />
      );
    case Routes.PROFILE:
      return (
        <Profile
          setPage={setPage}
          resume={resume}
          setResume={setResume}
          openAIkey={openAIkey}
          setOpenAIkey={setOpenAIkey}
        />
      );

    default:
      return <Generator setPage={setPage} />;
  }
}

export default App;
