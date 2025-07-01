import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import api from '../api';

interface UsuarioAPI {
  id: number;
  name: string;
  lastname: string;
  email: string;
  photo?: string; // añadimos photo como campo opcional
}

export default function HermandadScreen() {
  const [usuarios, setUsuarios] = useState<UsuarioAPI[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/usuarios')
      .then(res => {
        console.log('✅ Usuarios desde API:', res.data);
        setUsuarios(res.data);
      })
      .catch(err => {
        console.error('❌ Error al cargar usuarios:', err.message);
      })
      .finally(() => setCargando(false));
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>🤝 Hermandad</Text>

      {cargando ? (
        <Text>Cargando...</Text>
      ) : usuarios.length === 0 ? (
        <Text>No hay usuarios registrados.</Text>
      ) : (
        usuarios.map((u) => (
          <View key={u.id} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8 }}>
            {u.photo ? (
              <Image
                source={{ uri: u.photo }}
                style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 5 }}
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#ccc',
                  marginBottom: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text>Sin foto</Text>
              </View>
            )}
            <Text style={{ fontWeight: 'bold' }}>{u.name} {u.lastname}</Text>
            <Text>{u.email}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
