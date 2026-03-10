import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

type Props = {
  title: string;
  images: string[];
  pageNumber: number;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingBottom: 24,
    paddingHorizontal: 18,
    fontFamily: "NotoSans",
    backgroundColor: "#f3f3f3",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageBox: {
    width: "48%",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
  },
  emptyBox: {
    width: "48%",
    height: 220,
    border: "1 solid #bbb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 11,
    color: "#666",
    fontFamily: "NotoSans",
  },
});

function ImageGridPage({ title, images, pageNumber }: Props) {
  const visibleImages = images.slice(0, 6);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.pageNumber}>{pageNumber}</Text>
      </View>

      <View style={styles.grid}>
        {visibleImages.length > 0 ? (
          visibleImages.map((img, index) => (
            <View key={index} style={styles.imageBox}>
              <Image src={img} style={styles.image} />
            </View>
          ))
        ) : (
          <>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Görsel eklenmedi</Text>
            </View>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Görsel eklenmedi</Text>
            </View>
          </>
        )}
      </View>
    </Page>
  );
}

export default ImageGridPage;