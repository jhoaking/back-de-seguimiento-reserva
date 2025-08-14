interface SeedService {
  name: string;
  description: string;
  price: number;
  duration: string;
  activo: boolean;
}

interface SeedData {
  services: SeedService[];
}

export const initialData: SeedData = {
  services: [
    {
      name: 'Masaje Relajante',
      description:
        'Masaje corporal completo con aceites esenciales para aliviar el estrés, reducir la tensión muscular y mejorar la circulación. Ideal para desconectar del día a día.',
      price: 50,
      duration: '60 minutos',
      activo: true,
    },
    {
      name: 'Corte de Cabello',
      description:
        'Corte profesional para hombre o mujer, adaptado a tu estilo y preferencias. Incluye lavado y peinado.',
      price: 20,
      duration: '30 minutos',
      activo: true,
    },
    {
      name: 'Limpieza Facial Profunda',
      description:
        'Tratamiento facial para eliminar impurezas, puntos negros y células muertas. Mejora la textura y luminosidad de tu piel.',
      price: 40,
      duration: '45 minutos',
      activo: true,
    },
    {
      name: 'Clases de Yoga',
      description:
        'Sesiones guiadas de yoga para mejorar tu flexibilidad, concentración y bienestar general. Apto para todos los niveles.',
      price: 15,
      duration: '60 minutos',
      activo: true,
    },
    {
      name: 'Pedicure Spa',
      description:
        'Tratamiento completo de pedicure con exfoliación, masaje, esmaltado y cuidado de uñas. Ideal para pies cansados.',
      price: 25,
      duration: '45 minutos',
      activo: true,
    },
    {
      name: 'Asesoría Nutricional',
      description:
        'Consulta con un especialista para diseñar un plan de alimentación personalizado según tus objetivos de salud.',
      price: 35,
      duration: '60 minutos',
      activo: true,
    },
    {
      name: 'Entrenamiento Personalizado',
      description:
        'Rutinas de ejercicio personalizadas con seguimiento profesional. Mejora tu condición física de manera segura y eficaz.',
      price: 60,
      duration: '90 minutos',
      activo: true,
    },
    {
      name: 'Depilación Láser',
      description:
        'Eliminación progresiva del vello mediante tecnología láser. Resultados duraderos y seguros para todo tipo de piel.',
      price: 80,
      duration: '30 minutos',
      activo: true,
    },
    {
      name: 'Manicure Profesional',
      description:
        'Limpieza, corte, limado y esmaltado de uñas. Incluye masaje de manos e hidratación. Ideal para cualquier ocasión.',
      price: 18,
      duration: '30 minutos',
      activo: true,
    },
    {
      name: 'Fotografía Profesional',
      description:
        'Sesión de fotos en estudio o exterior, con edición incluida. Ideal para retratos, eventos o promoción personal.',
      price: 100,
      duration: '120 minutos',
      activo: true,
    },
  ],
};
