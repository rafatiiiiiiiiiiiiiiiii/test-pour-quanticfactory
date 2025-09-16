// src/App.jsx
import { useState } from "react";
import HomePage from "./pages/HomePage";
import DataPage from "./pages/DataPage";

export default function App() {
  const [showData, setShowData] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // requête globale

  return (
    <>
      {showData ? (
        <DataPage
          onBack={() => setShowData(false)}
          initialQuery={searchQuery}   // ✅ toujours "initialQuery"
        />
      ) : (
        <HomePage
          onStart={(queryFromHome) => {
            setSearchQuery(queryFromHome || ""); // ✅ stocke la recherche (vide si rien)
            setShowData(true); // ✅ ouvre DataPage
          }}
        />
      )}
    </>
  );
}
