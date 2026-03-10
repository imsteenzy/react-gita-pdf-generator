import { useMemo, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import FormInputs from "./components/FormInputs";
import ContentsEditor from "./components/ContentsEditor";
import PdfDocument from "./pdf/PdfDocument";
import ImageUploader from "./components/ImageUploader";

type FormDataType = {
  name: string;
  studentId: string;
  term: string;
  professor: string;
  courseCode: string;
  courseName: string;
  projectTitle: string;
  deliveryInfo: string;
};

type ChildType = {
  id: string;
  title: string;
  type: "grid" | "single";
  pageStart?: number;
  pageEnd?: number;
};

type SectionType = {
  id: string;
  title: string;
  page?: number;
  children: ChildType[];
};

function App() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    studentId: "",
    term: "",
    professor: "",
    courseCode: "",
    courseName: "",
    projectTitle: "",
    deliveryInfo: "",
  });

  const [contents, setContents] = useState<SectionType[]>([
    {
      id: crypto.randomUUID(),
      title: "Küp",
      children: [
        {
          id: crypto.randomUUID(),
          title: "Yapım Aşamaları",
          type: "grid",
        },
        {
          id: crypto.randomUUID(),
          title: "Orjinal Çalışma",
          type: "single",
        },
      ],
    },
  ]);

  const [sectionImages, setSectionImages] = useState<Record<string, string[]>>(
    {}
  );

  const computedContents = useMemo(() => {
    const result = { currentPage: 1 };

    return contents.map((section) => {
      const sectionPage = result.currentPage;
      result.currentPage += 1;

      const children = section.children.map((child) => {
        const imageCount = sectionImages[child.id]?.length || 0;

        let pagesForChild = 1;

        if (child.type === "grid") {
          pagesForChild = Math.max(1, Math.ceil(imageCount / 6));
        } else {
          pagesForChild = Math.max(1, imageCount || 1);
        }

        const startPage = result.currentPage;
        const endPage = result.currentPage + pagesForChild - 1;
        result.currentPage += pagesForChild;

        return {
          ...child,
          pageStart: startPage,
          pageEnd: endPage,
        };
      });

      return {
        ...section,
        page: sectionPage,
        children,
      };
    });
  }, [contents, sectionImages]);

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 1000,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>PDF Generator</h1>

      <FormInputs formData={formData} setFormData={setFormData} />

      <ContentsEditor contents={contents} setContents={setContents} />

      <ImageUploader
        contents={contents}
        sectionImages={sectionImages}
        setSectionImages={setSectionImages}
      />

      <div style={{ marginTop: 24 }}>
        <PDFDownloadLink
          document={
            <PdfDocument
              formData={formData}
              contents={computedContents}
              sectionImages={sectionImages}
            />
          }
          fileName="project.pdf"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            background: "#111",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 8,
          }}
        >
          {({ loading, error }) => {
            if (loading) return "PDF hazırlanıyor...";
            if (error) return "PDF hatası var";
            return "PDF indir";
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;