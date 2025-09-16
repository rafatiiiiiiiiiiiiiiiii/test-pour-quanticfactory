import { useState, useEffect } from "react";

export default function HomePage({ onStart }) {
  const [localQuery, setLocalQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleGo = () => {
    if (localQuery.trim()) {
      onStart(localQuery); // ✅ envoie la recherche
    } else {
      onStart(""); // si vide → ouvre tout
    }
  };

  // --- Simulation d’un petit dataset local pour les suggestions ---
  useEffect(() => {
    if (localQuery.trim().length > 0) {
      // 👉 ICI tu peux remplacer par un fetch si tu veux taper l’API
      const allData = [
        "PARC KELLERMANN",
        "SQUARE HENRI KARCHER",
        "PARC DE BERCY",
        "RUE DE PALI KAO",
        "JARDIN DU MUSÉE DE CLUNY",
        "SQUARE LEON SERPOLLET",
        "JARDIN DES SERRES D'AUTEUIL",
        "PLACE DES VOSGES",
      ];

      setSuggestions(
        allData.filter((item) =>
          item.toLowerCase().includes(localQuery.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [localQuery]);

  return (
    <div className="min-h-screen w-full bg-purple-300 text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-black">
          Îlots de fraîcheur à Paris
        </h1>

        {/* Bouton Explorer toutes les données */}
        <button
          onClick={() => onStart("")}
          className="px-6 py-2 rounded-full font-semibold shadow-lg 
                     bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 
                     text-white hover:shadow-xl hover:scale-105 transition-transform"
        >
          Explorer les données
        </button>
      </header>

      {/* Contenu principal */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-3xl font-extrabold text-black mb-4">
          Restez au frais dans la capitale
        </h2>

        {/* 🔍 Barre de recherche + suggestions */}
        <div className="mt-4 flex flex-col items-center relative w-[300px]">
          <input
            type="text"
            placeholder="Rechercher une fontaine, un parc ou un équipement…"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGo()}
            className="w-full border rounded-full px-4 py-2 shadow bg-white text-black focus:outline-none"
          />

          {/* Suggestions opaques */}
          {localQuery && suggestions.length > 0 && (
            <ul
              className="absolute top-full left-0 mt-1 
                         bg-white text-black 
                         shadow-lg rounded-lg 
                         w-full max-h-40 overflow-y-auto z-50 border border-purple-600"
              style={{ backgroundColor: "white", opacity: 1 }}
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setLocalQuery(s);
                    handleGo();
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-purple-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          {/* Bouton Explorer */}
          <button
            onClick={handleGo}
            className="mt-3 px-6 py-2 rounded-full font-semibold shadow-md transition
                       bg-[#5f259f] text-white hover:bg-[#491d7d]"
          >
            Explorer
          </button>
        </div>

        {/* Texte descriptif */}
        <p className="text-lg text-black max-w-2xl mb-8 mt-8">
          Découvrez les fontaines, espaces verts et équipements mis à disposition
          par la Ville de Paris. Explorez facilement grâce aux données ouvertes et
          trouvez votre coin de fraîcheur préféré.
        </p>

        {/* Image centrée */}
        <img
          src="https://th.bing.com/th/id/R.210dc90833c73e0933a249baa9a5062e?rik=JYtkGAhRtg8y%2fA&pid=ImgRaw&r=0"
          alt="Parc à Paris"
          className="w-[300px] rounded-xl shadow-2xl object-cover"
        />
      </main>
    </div>
  );
}
