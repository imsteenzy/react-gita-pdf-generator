interface Child {
  id: string;
  title: string;
  type: "grid" | "single";
}

interface Section {
  id: string;
  title: string;
  children: Child[];
}

function ContentsEditor({ contents, setContents }: { contents: Section[]; setContents: React.Dispatch<React.SetStateAction<Section[]>> }) {
  const addSection = () => {
    setContents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "YENİ BÖLÜM",
        children: [],
      },
    ]);
  };

  const updateSectionTitle = (sectionId: string, value: string) => {
    setContents((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setContents((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const addChild = (sectionId: string) => {
    setContents((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              children: [
                ...section.children,
                {
                  id: crypto.randomUUID(),
                  title: "YENİ ALT BAŞLIK",
                  type: "grid",
                },
              ],
            }
          : section
      )
    );
  };

  const updateChild = (sectionId: string, childId: string, field: keyof Child, value: string) => {
    setContents((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              children: section.children.map((child) =>
                child.id === childId ? { ...child, [field]: value } : child
              ),
            }
          : section
      )
    );
  };

  const removeChild = (sectionId: string, childId: string) => {
    setContents((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              children: section.children.filter((child) => child.id !== childId),
            }
          : section
      )
    );
  };

  const boxStyle = {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    background: "#fafafa",
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h2>İçindekiler Editörü</h2>

      {contents.map((section, index) => (
        <div key={section.id} style={boxStyle}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              style={inputStyle}
              value={section.title}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
              placeholder={`Bölüm ${index + 1}`}
            />
            <button onClick={() => addChild(section.id)}>Alt Başlık Ekle</button>
            <button onClick={() => removeSection(section.id)}>Sil</button>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {section.children.map((child) => (
              <div
                key={child.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 180px 90px",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <input
                  style={inputStyle}
                  value={child.title}
                  onChange={(e) =>
                    updateChild(section.id, child.id, "title", e.target.value)
                  }
                  placeholder="Alt başlık"
                />

                <select
                  style={inputStyle}
                  value={child.type}
                  onChange={(e) =>
                    updateChild(section.id, child.id, "type", e.target.value)
                  }
                >
                  <option value="grid">Grid Görsel Sayfası</option>
                  <option value="single">Tek Görsel Sayfası</option>
                </select>

                <button onClick={() => removeChild(section.id, child.id)}>
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={addSection}>Yeni Bölüm Ekle</button>
    </div>
  );
}

export default ContentsEditor;