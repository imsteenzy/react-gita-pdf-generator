interface FormData {
  name: string;
  studentId: string;
  term: string;
  professor: string;
  courseCode: string;
  courseName: string;
  projectTitle: string;
  deliveryInfo: string;
}

function FormInputs({ formData, setFormData }: { formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>> }) {
  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h2>Form Bilgileri</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <input
          style={inputStyle}
          placeholder="Ad Soyad"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Okul Numarası"
          value={formData.studentId}
          onChange={(e) => handleChange("studentId", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Ders Dönemi"
          value={formData.term}
          onChange={(e) => handleChange("term", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Görevli Akademisyen"
          value={formData.professor}
          onChange={(e) => handleChange("professor", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Ders Kodu"
          value={formData.courseCode}
          onChange={(e) => handleChange("courseCode", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Ders Adı"
          value={formData.courseName}
          onChange={(e) => handleChange("courseName", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Proje Adı"
          value={formData.projectTitle}
          onChange={(e) => handleChange("projectTitle", e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Teslim Bilgileri"
          value={formData.deliveryInfo}
          onChange={(e) => handleChange("deliveryInfo", e.target.value)}
        />
      </div>
    </div>
  );
}

export default FormInputs;