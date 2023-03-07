import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from 'react-native';
import {Formulario, Clima} from './components/';
import {ClimaApi} from './components/types/climaTypes';

function App(): JSX.Element {
  const [busqueda, setBusqueda] = useState<{
    ciudad: string;
    pais: number | string;
  }>({
    ciudad: '',
    pais: '',
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState<ClimaApi | undefined>();
  const [bgColor, setBgColor] = useState<string>('rgb(71,149,212)');

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        try {
          const appID = 'ed31c6d0fa6d2576d58839e54a14bf44';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
  }, [ciudad, consultar, pais]);

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultados, intenta con otra ciudad o pais.', [
      {text: 'Aceptar'},
    ]);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={ocultarTeclado}>
        <View style={styles.app}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
