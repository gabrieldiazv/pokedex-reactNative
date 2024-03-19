import {useContext} from 'react';
import {Pressable, Image, StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/StackNavigator';

interface Props {
  idPokemon: number;
}

export const ButtonNextPokemon = ({idPokemon}: Props) => {
  const {isDark} = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  // console.log('isDark', isDark);
  const pokeballImg = isDark
    ? require('../../../assets/pokeball-dark.png')
    : require('../../../assets/pokeball-light.png');

  const colorText = isDark ? 'white' : 'black';
  const irAlSiguientePokemon = () => {
    console.log('pasando')
    console.log('idPokemon', idPokemon + 1);
    // navigation.navigate('PokemonScreen', {
    //   pokemonId: idPokemon + 1,
    //   color: 'red',
    // });
  };
  return (
    <Pressable onPress={() =>
      navigation.navigate('PokemonScreen', {
        pokemonId: idPokemon + 1,
        color: 'red',
      })
    } style={styles.pressable}>
      <Image
        source={pokeballImg}
        style={{
          width: 100,
          height: 100,
          opacity: 0.5,
        }}
      />
      <Text style={[styles.texto, {color: colorText}]}>Next</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 100,
    zIndex: 999,
  },
  texto: {
    position: 'absolute',
    top: 35,
    right: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
