import React, {FC, useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {formPicker} from '../data/PickerValue';

interface FormularioProps {}

const Formulario: FC<FormularioProps> = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <View>
        <View>
          <TextInput
            placeholder="Ciudad"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
        <View>
          <Picker itemStyle={{height: 120, backgroundColor: '#FFF'}}>
            <Picker.Item label="--Seleccione Pais" value="" />
            {formPicker.map(picker => (
              <Picker.Item
                key={picker.id}
                label={picker.pais}
                value={picker.codigo}
              />
            ))}
          </Picker>
        </View>

        <TouchableWithoutFeedback>
          <View style={styles.btnBuscar}>
            <Text style={styles.textoBuscar}>Buscar clima</Text>
          </View>
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
