import "./fonts";
import React from "react";
import { Document } from "@react-pdf/renderer";
import CoverPage from "./CoverPage";
import TableOfContents from "./TableOfContents";
import SectionPage from "./SectionPage";
import ImageGridPage from "./ImageGridPage";
import SingleImagePage from "./SingleImagePage";

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

type Props = {
  formData: FormDataType;
  contents: SectionType[];
  sectionImages: Record<string, string[]>;
};

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function PdfDocument({ formData, contents, sectionImages }: Props) {
  const pages: React.ReactNode[] = [];

  pages.push(<CoverPage key="cover" formData={formData} />);
  pages.push(<TableOfContents key="toc" contents={contents} />);

  contents.forEach((section) => {
    pages.push(
      <SectionPage
        key={`section-${section.id}`}
        title={section.title}
        pageNumber={section.page || 1}
      />
    );

    section.children.forEach((child) => {
      const images = sectionImages[child.id] || [];

      if (child.type === "grid") {
        const imageGroups = chunkArray(images, 6);

        if (imageGroups.length === 0) {
          pages.push(
            <ImageGridPage
              key={`grid-empty-${child.id}`}
              title={child.title}
              images={[]}
              pageNumber={child.pageStart || 1}
            />
          );
        } else {
          imageGroups.forEach((group, index) => {
            pages.push(
              <ImageGridPage
                key={`grid-${child.id}-${index}`}
                title={child.title}
                images={group}
                pageNumber={(child.pageStart || 1) + index}
              />
            );
          });
        }
      } else {
        if (images.length === 0) {
          pages.push(
            <SingleImagePage
              key={`single-empty-${child.id}`}
              title={child.title}
              image={null}
              pageNumber={child.pageStart || 1}
            />
          );
        } else {
          images.forEach((image, index) => {
            pages.push(
              <SingleImagePage
                key={`single-${child.id}-${index}`}
                title={child.title}
                image={image}
                pageNumber={(child.pageStart || 1) + index}
              />
            );
          });
        }
      }
    });
  });

  return <Document>{pages}</Document>;
}

export default PdfDocument;