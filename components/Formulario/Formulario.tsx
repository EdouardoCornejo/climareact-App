import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {formPicker} from '../data/PickerValue';

interface FormularioProps {
  busqueda: {ciudad: string; pais: number | string};
  setBusqueda: Dispatch<
    SetStateAction<{ciudad: string; pais: number | string}>
  >;
  setConsultar: Dispatch<SetStateAction<boolean>>;
}

const Formulario: FC<FormularioProps> = ({
  busqueda,
  setBusqueda,
  setConsultar,
}) => {
  const {pais: Pais, ciudad} = busqueda;
  const [animacionBoton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (Pais.toString().trim() === '' || ciudad.trim() === '') {
      setConsultar(false);
      mostrarAlerta();
    } else {
      //Consultar api
      setConsultar(true);
    }
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y país para la busqueda.', [
      {text: 'Aceptar'},
    ]);
  };

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={ciudad}
            onChangeText={ciudad => setBusqueda({...busqueda, ciudad})}
            placeholder="Ciudad"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
        <View>
          <Picker
            selectedValue={Pais}
            onValueChange={(pais: number | string) =>
              setBusqueda({
                ...busqueda,
                pais,
              })
            }
            itemStyle={{height: 120, backgroundColor: '#FFF'}}>
            <Picker.Item label="--Seleccione Pais--" value="" />
            {formPicker.map(picker => (
              <Picker.Item
                key={picker.id}
                label={picker.pais}
                value={picker.codigo}
              />
            ))}
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={animacionEntrada}
          onPressOut={animacionSalida}
          onPress={consultarClima}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
