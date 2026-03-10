import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

type Props = {
  title: string;
  image: string | null;
  pageNumber: number;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingBottom: 30,
    paddingHorizontal: 24,
    fontFamily: "NotoSans",
    backgroundColor: "#f3f3f3",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "NotoSans",
  },
  pageNumber: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoSans",
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1 solid #ddd",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 650,
    objectFit: "contain",
  },
  emptyText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "NotoSans",
  },
});

function SingleImagePage({ title, image, pageNumber }: Props) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.pageNumber}>{pageNumber}</Text>
      </View>

      <View style={styles.imageWrap}>
        {image ? (
          <Image src={image} style={styles.image} />
        ) : (
          <Text style={styles.emptyText}>Görsel eklenmedi</Text>
        )}
      </View>
    </Page>
  );
}

export default SingleImagePage;