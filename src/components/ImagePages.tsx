import { Page, Image, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({

page:{
padding:60
},

grid:{
display:"flex",
flexDirection:"row",
flexWrap:"wrap",
gap:10
},

image:{
width:"45%",
marginBottom:10
}

})

const ImagePages = ({images}: {images: string[]}) => (

<Page style={styles.page}>

<View style={styles.grid}>

{images.map((img: string, index: number) => (
<Image key={index} src={img} style={styles.image}/>
))}

</View>

</Page>

)

export default ImagePages