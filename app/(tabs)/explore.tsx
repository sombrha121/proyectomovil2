import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import api from '../api';

interface Usuario {
  id: number;
  name: string;
  lastname: string;
  email: string;
  birthday: string; // formato "DD-MM-YYYY"
  sex: string; // "M" o "F"
  photo?: string;
}

export default function ConsolidadoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animación para entrada suave

  // Función para convertir string "DD-MM-YYYY" a objeto Date
  const parseFecha = (fecha: string): Date => {
    const [dia, mes, anio] = fecha.split('-');
    return new Date(Number(anio), Number(mes) - 1, Number(dia));
  };

  // Calcular edad con objeto Date
  const getEdad = (fechaNacimiento: string): number => {
    const hoy = new Date();
    const nacimiento = parseFecha(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  // Filtrar usuarios que cumplen años este mes
  const cumpleanerosDelMes = usuarios.filter(u => {
    const cumple = parseFecha(u.birthday);
    const ahora = new Date();
    return cumple.getMonth() === ahora.getMonth();
  });

  // Contar hombres y mujeres
  const totalHombres = usuarios.filter(u => u.sex === 'M').length;
  const totalMujeres = usuarios.filter(u => u.sex === 'F').length;

  useEffect(() => {
    api.get('/usuarios')
      .then(res => {
        setUsuarios(res.data);
        // Animación de entrada
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      })
      .catch(err => {
        console.error('❌ Error:', err);
      })
      .finally(() => setCargando(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Consolidado de Usuarios</Text>

      {cargando ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Totales */}
          <View style={styles.statsContainer}>
            <View style={[styles.card, styles.maleCard]}>
              <Text style={styles.cardTitle}>👨 Hombres</Text>
              <Text style={styles.cardValue}>{totalHombres}</Text>
            </View>
            <View style={[styles.card, styles.femaleCard]}>
              <Text style={styles.cardTitle}>👩 Mujeres</Text>
              <Text style={styles.cardValue}>{totalMujeres}</Text>
            </View>
          </View>

          {/* Cumpleañeros */}
          <Text style={styles.sectionTitle}>🎉 Cumpleañeros del mes</Text>
          {cumpleanerosDelMes.length === 0 ? (
            <Text style={styles.emptyText}>No hay cumpleaños este mes.</Text>
          ) : (
            cumpleanerosDelMes.map(u => (
              <View key={u.id} style={styles.userCard}>
                {u.photo ? (
                  <Image source={{ uri: u.photo }} style={styles.userImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>Sin foto</Text>
                  </View>
                )}
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{u.name} {u.lastname}</Text>
                  <Text style={styles.userDetails}>🎂 {u.birthday} - {getEdad(u.birthday)} años</Text>
                  <Text style={styles.userDetails}>{u.email}</Text>
                </View>
              </View>
            ))
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  maleCard: {
    backgroundColor: '#dbeafe',
  },
  femaleCard: {
    backgroundColor: '#fce7f3',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginVertical: 20,
  },
  userCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  placeholderImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  placeholderText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
});