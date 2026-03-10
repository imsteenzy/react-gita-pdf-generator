interface Child {
  id: string;
  title: string;
  type: string;
}

interface Section {
  id: string;
  title: string;
  children: Child[];
}

interface SectionImages {
  [key: string]: string[];
}

function ImageUploader({ contents, sectionImages, setSectionImages }: { contents: Section[]; sectionImages: SectionImages; setSectionImages: React.Dispatch<React.SetStateAction<SectionImages>> }) {
  const handleImageChange = (childId: string, files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));

    setSectionImages((prev) => ({
      ...prev,
      [childId]: urls,
    }));
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h2>Görsel Yükleme</h2>

      {contents.map((section) => (
        <div key={section.id} style={{ marginBottom: 18 }}>
          <h3>{section.title}</h3>

          {section.children.map((child) => (
            <div
              key={child.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <strong>{child.title}</strong> ({child.type})
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageChange(child.id, e.target.files)}
              />

              <div style={{ marginTop: 8, fontSize: 14 }}>
                Yüklenen görsel sayısı: {sectionImages[child.id]?.length || 0}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageUploader;