import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
  contents: SectionType[];
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 55,
    paddingBottom: 55,
    paddingHorizontal: 45,
    fontFamily: "NotoSans",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 24,
    fontFamily: "NotoSans",
  },
  sectionRow: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "NotoSans",
  },
  childRow: {
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 16,
    fontFamily: "NotoSans",
  },
});

function formatPage(child: ChildType) {
  if (child.pageStart === child.pageEnd) {
    return `${child.pageStart}. Sayfa`;
  }
  return `${child.pageStart}-${child.pageEnd}. Sayfa`;
}

function TableOfContents({ contents }: Props) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>İÇİNDEKİLER</Text>

      {contents.map((section, index) => (
        <View key={section.id}>
          <Text style={styles.sectionRow}>
            {index + 1}/ {section.title} --- {section.page}. Sayfa
          </Text>

          {section.children.map((child) => (
            <Text key={child.id} style={styles.childRow}>
              / {child.title} --- {formatPage(child)}
            </Text>
          ))}
        </View>
      ))}
    </Page>
  );
}

export default TableOfContents;