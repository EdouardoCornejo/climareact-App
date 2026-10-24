# ClimaReact App

Aplicación móvil de **consulta del clima** hecha con **React Native** y **TypeScript**. El usuario escribe una ciudad, elige un país de una lista y la app consulta la **API de OpenWeatherMap** para mostrar la temperatura actual, la mínima, la máxima y el icono del estado del tiempo.

![Tech](https://img.shields.io/badge/React_Native-0.71.3-61DAFB)
![Tech](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Tech](https://img.shields.io/badge/TypeScript-4.8.4-3178C6)
![Tech](https://img.shields.io/badge/API-OpenWeatherMap-orange)

---

## Tabla de contenidos

- [ClimaReact App](#climareact-app)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Requisitos previos](#requisitos-previos)
    - [Instalación](#instalación)
    - [API key de OpenWeatherMap](#api-key-de-openweathermap)
    - [Ejecutar en Android](#ejecutar-en-android)
    - [Ejecutar en iOS](#ejecutar-en-ios)
    - [Scripts disponibles](#scripts-disponibles)
  - [Uso](#uso)
  - [Cómo funciona](#cómo-funciona)
    - [1. `App.tsx`](#1-apptsx)
    - [2. `components/Formulario/Formulario.tsx`](#2-componentsformularioformulariotsx)
    - [3. `components/Clima/Clima.tsx`](#3-componentsclimaclimatsx)
    - [4. Datos y tipos](#4-datos-y-tipos)
    - [Flujo de la app](#flujo-de-la-app)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Formulario de búsqueda** con un campo de texto para la ciudad y un `Picker` con 7 países (Estados Unidos, México, Argentina, Colombia, Costa Rica, España y Perú).
- **Validación**: si falta la ciudad o el país se muestra una alerta nativa (`Alert.alert`).
- **Consulta a OpenWeatherMap** (`/data/2.5/weather`) con `fetch`.
- **Conversión de Kelvin a °C** de la temperatura actual, mínima y máxima.
- **Icono del clima** cargado desde `openweathermap.org/img/w/<icono>.png`.
- **Botón animado** con `Animated.spring`: se encoge al presionarlo y rebota al soltarlo.
- **Ocultar el teclado** tocando en cualquier parte de la pantalla (`Keyboard.dismiss`).
- **Color de fondo** pensado para cambiar según la temperatura (ver [Personalización](#personalización)).

---

## Cómo ejecutar el proyecto

### Requisitos previos

- **Node.js 18** (indicado en `.node-version`) y **Yarn** (el repo incluye `yarn.lock`).
- Entorno de React Native CLI configurado ([guía oficial](https://reactnative.dev/docs/environment-setup)): Android Studio + SDK para Android; Xcode, Ruby `2.7.6` y CocoaPods para iOS (macOS).

### Instalación

```bash
git clone <url-del-repositorio>
cd climareact-App
yarn install
```

### API key de OpenWeatherMap

La app no usa variables de entorno: la clave está escrita directamente en `App.tsx`, en la constante `appID`. Para usar tu propia clave, crea una cuenta en [openweathermap.org](https://openweathermap.org/api) y reemplaza el valor:

```ts
const appID = 'TU_API_KEY';
```

### Ejecutar en Android

```bash
yarn start          # arranca Metro
yarn android        # en otra terminal: compila e instala en el emulador/dispositivo
```

### Ejecutar en iOS

```bash
cd ios && bundle install && bundle exec pod install && cd ..
yarn start
yarn ios
```

### Scripts disponibles

| Script         | Comando                    | Descripción                            |
| -------------- | -------------------------- | -------------------------------------- |
| `yarn start`   | `react-native start`       | Inicia el bundler Metro                |
| `yarn android` | `react-native run-android` | Compila y ejecuta la app en Android    |
| `yarn ios`     | `react-native run-ios`     | Compila y ejecuta la app en iOS        |
| `yarn lint`    | `eslint .`                 | Revisa el código con ESLint            |
| `yarn test`    | `jest`                     | Ejecuta el test de render de `App.tsx` |

---

## Uso

1. Escribe el nombre de una **ciudad** en el campo "Ciudad".
2. Elige un **país** en el selector "--Seleccione Pais--".
3. Pulsa **"Buscar clima"**.
4. Sobre el formulario aparece la temperatura actual en °C con su icono y, debajo, los valores máximo y mínimo.

---

## Cómo funciona

### 1. `App.tsx`

Componente raíz y dueño del estado:

- `busqueda` (`{ ciudad, pais }`), `consultar` (bandera que dispara la petición), `resultado` (respuesta tipada como `ClimaApi`) y `bgColor`.
- Un `useEffect` con la función `consultarClima` se ejecuta cuando cambia `consultar`; si es `true`, construye la URL `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`, guarda la respuesta en `resultado` y vuelve a poner `consultar` en `false`.
- Si `fetch` lanza una excepción, `mostrarAlerta` muestra "No hay resultados, intenta con otra ciudad o pais.".
- Envuelve la pantalla en `TouchableWithoutFeedback` con `ocultarTeclado` para cerrar el teclado.

### 2. `components/Formulario/Formulario.tsx`

- `TextInput` para la ciudad y `Picker` (de `@react-native-community/picker`) alimentado por `formPicker`; ambos actualizan `busqueda` mediante `setBusqueda`.
- `consultarClima` valida que ciudad y país no estén vacíos y activa `setConsultar(true)`, o muestra una alerta si faltan datos.
- `animacionEntrada` / `animacionSalida` animan la escala del botón con `Animated.spring` (`useNativeDriver: true`).

### 3. `components/Clima/Clima.tsx`

- Devuelve `null` mientras `resultado` no tenga `name` (sin consulta o sin coincidencias).
- Resta `273.15` a `main.temp`, `main.temp_min` y `main.temp_max` para pasar de Kelvin a °C y los muestra truncados con `parseInt`.
- Muestra el icono `weather[0].icon` del servidor de imágenes de OpenWeatherMap.

### 4. Datos y tipos

- `components/data/PickerValue.ts` — `formPicker`, la lista de países (`PaisTypes`: `id`, `pais`, `codigo` ISO).
- `components/types/climaTypes.ts` — interfaces de la respuesta de la API (`ClimaApi`, `Main`, `Weather`, `Wind`, `Sys`…).

### Flujo de la app

```
App
  ├─ estado: busqueda, consultar, resultado, bgColor
  ├─ <Clima resultado />          → null hasta que haya resultado
  └─ <Formulario busqueda setBusqueda setConsultar />
        ↓
   "Buscar clima" → consultarClima()
     ├─ campos vacíos → Alert "Agrega una ciudad y país..."
     └─ setConsultar(true)
        ↓
   useEffect([ciudad, pais, consultar])
     ├─ fetch(api.openweathermap.org/data/2.5/weather?q=ciudad,pais&appid=...)
     ├─ setResultado(json) + setConsultar(false)
     └─ error → Alert "No hay resultados..."
        ↓
   <Clima> renderiza temp actual / max / min en °C + icono
```

---

## Tecnologías

- **React Native 0.71.3** + **React 18.2.0** — UI nativa para Android e iOS.
- **TypeScript 4.8.4** — tipado de props, estado y respuesta de la API.
- **@react-native-community/picker** — selector de país.
- **Animated API** de React Native — animación del botón.
- **OpenWeatherMap Current Weather API** — datos del clima.
- **ESLint**, **Prettier** y **Jest** (`react-test-renderer`) — calidad y test básico.

---

## Estructura del proyecto

```
climareact-App/
├── App.tsx                         # Componente raíz: estado y consulta a la API
├── index.js                        # Registro de la app (AppRegistry)
├── app.json                        # Nombre de la app
├── components/
│   ├── index.ts                    # Exporta Formulario y Clima
│   ├── Clima/
│   │   ├── Clima.tsx               # Muestra temperatura e icono
│   │   └── index.ts
│   ├── Formulario/
│   │   ├── Formulario.tsx          # Ciudad, país y botón animado
│   │   └── index.ts
│   ├── data/
│   │   └── PickerValue.ts          # Lista de países del Picker
│   └── types/
│       ├── climaTypes.ts           # Tipos de la respuesta de OpenWeatherMap
│       └── pickerTypes.ts          # Tipo PaisTypes
├── __tests__/
│   └── App-test.tsx                # Test de render
├── android/                        # Proyecto nativo Android
├── ios/                            # Proyecto nativo iOS
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── package.json
```

---

## Personalización

| Dónde                            | Qué                                | Valor actual                                                         |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `App.tsx` → `appID`              | API key de OpenWeatherMap          | Clave escrita en el código                                           |
| `App.tsx` → `bgColor`            | Color de fondo inicial             | `rgb(71,149,212)`                                                    |
| `App.tsx` → `consultarClima`     | Colores según temperatura          | `< 10 °C` → `rgb(105,108,149)`, `10–25 °C` → `rgb(178,28,61)`, resto → `rgb(71,149,212)` |
| `components/data/PickerValue.ts` | Países disponibles en el selector  | 7 países (`US`, `MX`, `AR`, `CO`, `CR`, `ES`, `PE`)                  |

> Notas sobre el código actual: el cálculo del color de fondo lee `resultado.data?.main.temp`, pero la respuesta de OpenWeatherMap no tiene la propiedad `data`, así que el fondo se queda en `rgb(71,149,212)`; para que funcione habría que usar `resultado.main.temp`. Además, en `Clima.tsx` las etiquetas "Max" y "Min" muestran los valores intercambiados (`temp_min` y `temp_max`).

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
