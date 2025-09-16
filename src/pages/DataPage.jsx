import { useEffect, useState } from "react";
import { motion } from "framer-motion";




    export default function DataPage({ onBack, initialQuery = "" }) {
      const [activeTab, setActiveTab] = useState("fontaines");
      const [query, setQuery] = useState(initialQuery); // "" si on vient du bouton "Explorer"
      const [showOnlyOpen, setShowOnlyOpen] = useState(false);
      const [showOnlyFreeEquip, setShowOnlyFreeEquip] = useState(false);
      const [selectedCloture, setSelectedCloture] = useState("ALL");
      const [selectedPeriode, setSelectedPeriode] = useState("ALL");




      // Normalisation de la recherche + helpers robustes
      const q = (query || "").trim().toLowerCase();
      const hasAny = (fields, keys) => {
        if (!q) return true; // si pas de recherche -> ne filtre pas
        return keys.some((k) =>
          String((fields && fields[k]) ?? "").toLowerCase().includes(q)
        );
      };

      /* -------------------- FONTAINES -------------------- */
      const [fontaines, setFontaines] = useState([]);
      const [loadingFontaines, setLoadingFontaines] = useState(true);
      const [commune, setCommune] = useState("ALL");
      const [typeFontaine, setTypeFontaine] = useState("ALL");

      useEffect(() => {
        fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=fontaines-a-boire&q=&rows=200")
          .then((res) => res.json())
          .then((json) => {
            setFontaines(json.records || []);
            setLoadingFontaines(false);
          })
          .catch(() => setLoadingFontaines(false));
      }, []);

      const communes = ["ALL", ...new Set(fontaines.map((f) => f.fields?.commune).filter(Boolean))];
      const typesFontaines = ["ALL", ...new Set(fontaines.map((f) => f.fields?.type_objet).filter(Boolean))];

      const filteredFontaines = fontaines.filter((rec) => {
        const f = rec.fields || {};
        return (
          (commune === "ALL" || f.commune === commune) &&
          (typeFontaine === "ALL" || f.type_objet === typeFontaine) &&
          // recherche globale (sur plusieurs colonnes)
          (!q || hasAny(f, ["voie", "commune", "type_objet", "modele"]))
        );
      });

      /* -------------------- ESPACES VERTS -------------------- */
      const [espaces, setEspaces] = useState([]);
      const [loadingEspaces, setLoadingEspaces] = useState(true);
      const [selectedPostal, setSelectedPostal] = useState("ALL");
      const [selectedCategorie, setSelectedCategorie] = useState("ALL");

      useEffect(() => {
        fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=espaces_verts&q=&rows=200")
          .then((res) => res.json())
          .then((json) => {
            setEspaces(json.records || []);
            setLoadingEspaces(false);
          })
          .catch(() => setLoadingEspaces(false));
      }, []);

      const postals = ["ALL", ...new Set(espaces.map((e) => e.fields?.adresse_codepostal).filter(Boolean))];
      const categories = ["ALL", ...new Set(espaces.map((e) => e.fields?.categorie).filter(Boolean))];

    const filteredEspaces = espaces.filter((rec) => {
    const f = rec.fields || {};

      return (
        (selectedPostal === "ALL" || f.adresse_codepostal === selectedPostal) &&
        (selectedCategorie === "ALL" || f.categorie === selectedCategorie) &&
        (selectedCloture === "ALL" || f.presence_cloture === selectedCloture) &&
        (!q ||
          hasAny(f, [
            "nom_ev",
            "categorie",
            "adresse_codepostal",
            "adresse_libellevoie",
            "adresse_numero",
          ]))
      );
    });


      /* -------------------- EQUIPEMENTS -------------------- */
      const [equipements, setEquipements] = useState([]);
      const [loadingEquipements, setLoadingEquipements] = useState(true);
      const [selectedArr, setSelectedArr] = useState("ALL");
      const [selectedType, setSelectedType] = useState("ALL");
      const [selectedPayant, setSelectedPayant] = useState("ALL");

      useEffect(() => {
        fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=ilots-de-fraicheur-equipements-activites&q=&rows=200")
          .then((res) => res.json())
          .then((json) => {
            setEquipements(json.records || []);
            setLoadingEquipements(false);
          })
          .catch(() => setLoadingEquipements(false));
      }, []);

      const arrondissements = ["ALL", ...new Set(equipements.map((e) => e.fields?.arrondissement).filter(Boolean))];
      const types = ["ALL", ...new Set(equipements.map((e) => e.fields?.type).filter(Boolean))];

      const filteredEquipements = equipements.filter((rec) => {
        const f = rec.fields || {};
        return (
          (selectedArr === "ALL" || f.arrondissement === selectedArr) &&
          (selectedType === "ALL" || f.type === selectedType) &&
          (selectedPayant === "ALL" || f.payant === selectedPayant) &&
          (selectedPeriode === "ALL" || f.horaires_periode?.includes(selectedPeriode)) && // ✅ nouveau filtre
          (!q || hasAny(f, ["nom", "type", "adresse", "arrondissement", "payant", "horaires_periode"]))
        );
      });


      return (

    <div className="min-h-screen bg-purple-200">
      <header className="flex items-center justify-between p-4 bg-purple-800 text-white shadow-md">
        <button onClick={onBack} className="px-4 py-2 bg-green-500 rounded shadow hover:bg-green-600">
          ⬅️ Retour
        </button>
        <h2 className="text-font-nexa font-bold text-3xl font-bold">Îlots de fraîcheur à Paris</h2>
        <div />
      </header>

      {/* Onglets */}
    <div className="flex justify-center mt-6 gap-4">
      <button
        className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
          activeTab === "fontaines"
            ? "bg-[#5f259f] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setActiveTab("fontaines")}
      >
        Fontaines
      </button>

      <button
        className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
          activeTab === "espaces"
            ? "bg-[#5f259f] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setActiveTab("espaces")}
      >
        Espaces verts
      </button>

      <button
        className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
          activeTab === "equipements"
            ? "bg-[#5f259f] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setActiveTab("equipements")}
      >
        Équipements
      </button>
    </div>


      {/* Contenu */}
      <motion.div
        className="p-6"
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      {/* -------------------- FONTAINES -------------------- */}
      {activeTab === "fontaines" && (
        <div>
          {/* BARRE DE TITRE */}
          <div className="-mx-6 mb-4 px-6 py-3 bg-[#5f259f] text-white">
            <h1 className="text-2xl font-nexa font-bold text-3xl-bold">Fontaines de Paris</h1>
          </div>

          {/* FILTRE GLOBAL DISPONIBILITÉ */}

          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition ${
                showOnlyOpen
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
              onClick={() => setShowOnlyOpen(!showOnlyOpen)}
            >
              {showOnlyOpen ? " Uniquement ouvertes" : "Toutes les fontaines"}
            </button>
          </div>

          {loadingFontaines ? (
            <p className="text-gray-700">Chargement...</p>
          ) : (
            <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                {/* 1re ligne : titres */}
                <tr className="bg-[#5f259f] text-white">
                  <th className="px-4 py-2 text-left">Voie</th>
                  <th className="px-4 py-2 text-left">Commune</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Disponible</th>
                  <th className="px-4 py-2 text-left">Modèle</th>
                </tr>
                {/* 2e ligne : filtres */}
                <tr className="bg-purple-100">
                  <td></td>
                  <td>
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      className="w-full text-black border rounded px-2 py-1"
                    >
                      {communes.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={typeFontaine}
                      onChange={(e) => setTypeFontaine(e.target.value)}
                      className="w-full text-black border rounded px-2 py-1"
                    >
                      {typesFontaines.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {filteredFontaines
                  .filter((f) => !showOnlyOpen || f.fields.dispo === "OUI")
                  .map((f, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-2">{f.fields.voie || "—"}</td>
                      <td className="px-4 py-2">{f.fields.commune || "—"}</td>
                      <td className="px-4 py-2">{f.fields.type_objet || "—"}</td>
                      <td className="px-4 py-2">{f.fields.dispo || "—"}</td>
                      <td className="px-4 py-2">{f.fields.modele || "—"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}


        {/* -------------------- ESPACES VERTS -------------------- */}
        {activeTab === "espaces" && (
          <div>
            <div className="-mx-6 mb-4 px-6 py-3 bg-[#5f259f] text-white">
              <h1 className="text-2xl font-bold">Espaces verts de Paris</h1>
            </div>

            {loadingEspaces ? (
              <p className="text-gray-700">Chargement...</p>
            ) : (
              <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#5f259f] text-white">
                    <th className="px-4 py-2 text-left">Nom</th>
                    <th className="px-4 py-2 text-left">Code postal</th>
                    <th className="px-4 py-2 text-left">Catégorie</th>
                    <th className="px-4 py-2 text-left">Année</th>
                    <th className="px-4 py-2 text-left">Adresse</th> 
                    <th className="px-4 py-2 text-left">Clôturé</th>
                  </tr>
                  <tr className="bg-purple-100">
                    <td></td>
                    <td>
                      <select
                        value={selectedPostal}
                        onChange={(e) => setSelectedPostal(e.target.value)}
                        className="w-full text-black border rounded px-2 py-1"
                      >
                        {postals.map((p, i) => (
                          <option key={i} value={p}>{p}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={selectedCategorie}
                        onChange={(e) => setSelectedCategorie(e.target.value)}
                        className="w-full text-black border rounded px-2 py-1"
                      >
                        {categories.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                    <select
                      value={selectedCloture}
                      onChange={(e) => setSelectedCloture(e.target.value)}
                      className="w-full text-black border rounded px-2 py-1"
                    >
                      <option value="ALL">Tous</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </td>

                  </tr>
                </thead>
                <tbody>
                  {filteredEspaces.map((e, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-2">{e.fields.nom_ev || "—"}</td>
                        <td className="px-4 py-2">{e.fields.adresse_codepostal || "—"}</td>
                        <td className="px-4 py-2">{e.fields.categorie || "—"}</td>
                        <td className="px-4 py-2">{e.fields.annee_ouverture || "—"}</td>
                        <td className="px-4 py-2">{`${e.fields.adresse_numero || ""} ${e.fields.adresse_libellevoie || ""}`}</td>
                        <td className="px-4 py-2">{e.fields.presence_cloture || "—"}</td>


                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      {/* -------------------- EQUIPEMENTS -------------------- */}
      {activeTab === "equipements" && (
        <div>
          <div className="-mx-6 mb-4 px-6 py-3 bg-[#5f259f] text-white">
            <h1 className="text-2xl font-bold">Équipements et activités</h1>
          </div>

          {/* FILTRE GLOBAL : Gratuit uniquement */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition ${
                showOnlyFreeEquip
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
              onClick={() => setShowOnlyFreeEquip(!showOnlyFreeEquip)}
            >
              {showOnlyFreeEquip ? "Uniquement gratuits" : "Tous les équipements"}
            </button>
          </div>

          {loadingEquipements ? (
            <p className="text-gray-700">Chargement...</p>
          ) : (
            <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-[#5f259f] text-white">
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Arrondissement</th>
                  <th className="px-4 py-2 text-left">Adresse</th>
                  <th className="px-4 py-2 text-left">Payant</th>
                  <th className="px-4 py-2 text-left">Horaires / Période</th>

                </tr>
                <tr className="bg-purple-100">
                  <td></td>
                  <td>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full text-black border rounded px-2 py-1"
                    >
                      {types.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={selectedArr}
                      onChange={(e) => setSelectedArr(e.target.value)}
                      className="w-full text-black border rounded px-2 py-1"
                    >
                      {arrondissements.map((a, i) => (
                        <option key={i} value={a}>{a}</option>
                      ))}
                    </select>
                  </td>
                  <td></td>

                  <td>
                  <select
                    value={selectedPeriode}
                    onChange={(e) => setSelectedPeriode(e.target.value)}
                    className="w-full text-black border rounded px-2 py-1"
                  >
                    <option value="ALL">Toutes</option>
                    <option value="été">Été uniquement</option>
                    <option value="année">Toute l'année</option>
                  </select>
                </td>

                </tr>
              </thead>
              <tbody>
                {filteredEquipements
                  .filter((e) => {
                    const payant = e.fields?.payant || "Non"; // 🔒 sécurisation
                    return showOnlyFreeEquip ? payant !== "Oui" : true;
                  })
                  .map((e, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-2">{e.fields.nom || "—"}</td>
                      <td className="px-4 py-2">{e.fields.type || "—"}</td>
                      <td className="px-4 py-2">{e.fields.arrondissement || "—"}</td>
                      <td className="px-4 py-2">{e.fields.adresse || "—"}</td>
                      <td className="px-4 py-2">{e.fields.payant || "—"}</td>
                      <td className="px-4 py-2">{e.fields.horaires_periode || "—"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      </motion.div>
    </div>
  );
}
