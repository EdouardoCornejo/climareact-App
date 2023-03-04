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
      <View style={styles.formulario}>
        <View>
          <TextInput placeholder="Ciudad" placeholderTextColor="#666" />
        </View>
        <View>
          <Picker onValueChange={() => setValue} selectedValue={value}>
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
          <View>
            <Text>Buscar clima</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    marginTop: 100,
  },
});
export default Formulario;
