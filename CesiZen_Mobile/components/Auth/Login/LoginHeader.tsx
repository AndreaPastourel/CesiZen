import { Image, Text, View } from "react-native";

type Props = {
  styles: any;
  title: string;
  subtitle: string;
};

export default function LoginHeader({ styles, title, subtitle }: Readonly<Props>) {
  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/logo-cesi-zen.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}