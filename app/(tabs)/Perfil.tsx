import { useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import api from '../api';

export default function PerfilScreen() {
  const { themeColor } = useTheme();

  const [form, setForm] = useState({
    name: '',
    lastname: '',
    birthday: '',
    phone: '',
    age: '',
    sex: '',
    description: '',
    direccion: '',
    email: '',
    password: '',
    photo: '', // URL de la imagen
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.lastname || !form.email || !form.password) {
      alert('Nombre, apellido, email y contraseña son obligatorios');
      return;
    }

    try {
      const response = await api.post('/usuarios', {
        ...form,
        age: parseInt(form.age),
      });

      console.log('✅ Usuario guardado:', response.data);
      alert('Usuario guardado correctamente 🎉');

      setForm({
        name: '',
        lastname: '',
        birthday: '',
        phone: '',
        age: '',
        sex: '',
        description: '',
        direccion: '',
        email: '',
        password: '',
        photo: '',
      });
    } catch (error: any) {
      console.error('❌ Error al guardar usuario:', error.response?.data || error.message);
      alert('Error al guardar usuario. Revisa los datos.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: themeColor, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>🧑‍💼 Nuevo Usuario</Text>

      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        {form.photo ? (
          <Image source={{ uri: form.photo }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Imagen URL</Text>
          </View>
        )}
      </View>

      <TextInput
        placeholder="URL de la imagen"
        value={form.photo}
        onChangeText={(text) => handleChange('photo', text)}
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      {[
        { label: 'Nombre', key: 'name' },
        { label: 'Apellido', key: 'lastname' },
        { label: 'Fecha de nacimiento', key: 'birthday' },
        { label: 'Teléfono', key: 'phone' },
        { label: 'Edad', key: 'age' },
        { label: 'Sexo (M/F)', key: 'sex' },
        { label: 'Descripción (opcional)', key: 'description' },
        { label: 'Dirección', key: 'direccion' },
        { label: 'Correo electrónico', key: 'email' },
        { label: 'Contraseña', key: 'password' },
      ].map((item) => (
        <TextInput
          key={item.key}
          placeholder={item.label}
          value={form[item.key as keyof typeof form]}
          onChangeText={(text) => handleChange(item.key, text)}
          secureTextEntry={item.key === 'password'}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
          }}
        />
      ))}

      <Button title="Guardar usuario" onPress={handleSubmit} />
    </ScrollView>
  );
}
