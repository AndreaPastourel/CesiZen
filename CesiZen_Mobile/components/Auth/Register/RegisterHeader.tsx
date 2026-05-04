import { Text, View } from "react-native";

type Props = Readonly<{
  styles: any;
  title: string;
  subtitle: string;
}>;

export default function RegisterHeader({ styles, title, subtitle }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}