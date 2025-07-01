import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

const colorOptions = [
  { name: 'Amarillo claro', key: 'amarilloClaro' },
  { name: 'Blanco', key: 'blanco' },
  { name: 'Naranja 1', key: 'naranja1' },
  { name: 'Naranja 2', key: 'naranja2' },
  { name: 'Gris claro', key: 'grisClaro' },
  {name:'verde',key:'Verdementa'},
] as const;

export default function ConfiguracionScreen() {
  const { setThemeColorByKey, themeColor } = useTheme();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: themeColor }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>⚙️ Configuración</Text>
      <Text style={{ marginBottom: 10 }}>Cambia el color del fondo:</Text>

      {colorOptions.map(({ name, key }) => (
        <TouchableOpacity
          key={key}
          onPress={() => setThemeColorByKey(key)}
          style={{
            padding: 12,
            backgroundColor: '#eee',
            borderRadius: 8,
            marginVertical: 6,
          }}
        >
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
