type ChildType = {
  id: string;
  title: string;
  type: "grid" | "single";
};

type SectionType = {
  id: string;
  title: string;
  children: ChildType[];
};

type Props = {
  contents: SectionType[];
  sectionImages: Record<string, string[]>;
  setSectionImages: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

function ImageUploader({ contents, sectionImages, setSectionImages }: Props) {
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (childId: string, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    try {
      const base64Images = await Promise.all(
        fileArray.map((file) => fileToBase64(file))
      );

      setSectionImages((prev) => ({
        ...prev,
        [childId]: base64Images,
      }));
    } catch (error) {
      console.error("Görseller okunamadı:", error);
    }
  };

  const removeImages = (childId: string) => {
    setSectionImages((prev) => ({
      ...prev,
      [childId]: [],
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
                background: "#fafafa",
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

              {!!sectionImages[child.id]?.length && (
                <button
                  onClick={() => removeImages(child.id)}
                  style={{
                    marginTop: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  Görselleri Temizle
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageUploader;