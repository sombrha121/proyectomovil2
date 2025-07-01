import React, { createContext, useContext, useState } from 'react';

export type Persona = {
  id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  telefono: string;
  cumpleanos?: string;
  correo: string;
  direccion: string;
  etiqueta: string;
  nota: string;
  fotoUri?: string;
};

type PersonasContextType = {
  personas: Persona[];
  agregarPersona: (persona: Persona) => void;
};

const PersonasContext = createContext<PersonasContextType>({
  personas: [],
  agregarPersona: () => { },
});

export const PersonasProvider = ({ children }: { children: React.ReactNode }) => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  const agregarPersona = (persona: Persona) => {
    setPersonas(prev => [...prev, persona]);
  };

  return (
    <PersonasContext.Provider value={{ personas, agregarPersona }}>
      {children}
    </PersonasContext.Provider>
  );
};

export const usePersonas = () => useContext(PersonasContext);
