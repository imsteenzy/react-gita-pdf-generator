import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import logo from "../assets/logo.png";

type Props = {
  formData: {
    name: string;
    studentId: string;
    term: string;
    professor: string;
    courseCode: string;
    courseName: string;
    projectTitle: string;
    deliveryInfo: string;
  };
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 45,
    paddingBottom: 55,
    paddingHorizontal: 34,
    backgroundColor: "#f1f1f1",
    fontFamily: "NotoSans",
  },
  header: {
    marginBottom: 180,
  },
  logo: {
    width: 220,
    marginBottom: 12,
  },
  infoBlock: {
    marginTop: "auto",
  },
  row: {
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoSans",
  },
});

function CoverPage({ formData }: Props) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={logo} style={styles.logo} />
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.row}>AD-SOYAD : {formData.name}</Text>
        <Text style={styles.row}>OKUL NO : {formData.studentId}</Text>
        <Text style={styles.row}>DERS DÖNEMİ : {formData.term}</Text>
        <Text style={styles.row}>
          DERS SORUMLUSU ÖĞRETİM ÜYESİ : {formData.professor}
        </Text>
        <Text style={styles.row}>
          DERS KODU VE ADI : {formData.courseCode} {formData.courseName}
        </Text>
        <Text style={styles.row}>PROJE ADI : {formData.projectTitle}</Text>
        <Text style={styles.row}>TESLİM BİLGİLERİ : {formData.deliveryInfo}</Text>
      </View>
    </Page>
  );
}

export default CoverPage;