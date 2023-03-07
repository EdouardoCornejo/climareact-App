import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ClimaApi} from '../types/climaTypes';

interface ClimaProps {
  resultado: ClimaApi | undefined;
}

const Clima: FC<ClimaProps> = ({resultado}) => {
  if (!resultado?.name) {
    return null;
  }

  const kelvin = 273.15;
  const value = resultado?.main.temp;
  const temp = value - kelvin;
  const minTemp = resultado?.main.temp_min - kelvin;
  const maxTemp = resultado?.main.temp_max - kelvin;

  return (
    <View style={styles.clima}>
      <Text style={[styles.texto, styles.actual]}>
        {parseInt(temp.toString())}
        <Text style={styles.temperatura}> &deg;C</Text>
        <Image
          style={{width: 66, height: 58}}
          source={{
            uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`,
          }}
        />
      </Text>

      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          Max{' '}
          <Text style={styles.temperatura}>
            {parseInt(minTemp.toString())}&deg;C
          </Text>
        </Text>

        <Text style={styles.texto}>
          Min{' '}
          <Text style={styles.temperatura}>
            {parseInt(maxTemp.toString())}&deg;C
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Clima;
