import {View, Text, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-paper';

interface Props {
  color?: string;
}

export const FullScreenLoader = ({color}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator size={50} color={color || colors.primary} />
    </View>
  );
};
