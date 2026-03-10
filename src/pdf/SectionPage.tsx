import { Page, Text, StyleSheet } from "@react-pdf/renderer";

type Props = {
  title: string;
  pageNumber: number;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: "NotoSans",
  },
  pageNumber: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "NotoSans",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "NotoSans",
  },
});

function SectionPage({ title, pageNumber }: Props) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageNumber}>{pageNumber}</Text>
      <Text style={styles.title}>1/ {title}</Text>
    </Page>
  );
}

export default SectionPage;