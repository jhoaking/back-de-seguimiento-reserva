import axios from 'axios';
import { CreateInteraccioneDto } from '../dto/create-interaccione.dto';

export const sendMessageByN8n = async (payload: CreateInteraccioneDto) => {
  const urls = [
    'https://primary-production-3577.up.railway.app/webhook-test/e758b21c-c7ca-4fa5-b78c-ef00e65d817d',
    'https://primary-production-3577.up.railway.app/webhook/e758b21c-c7ca-4fa5-b78c-ef00e65d817d',
  ];

  for (const url of urls) {
    try {
      await axios.post(url, payload);
      console.log(`Mensaje enviado correctamente a ${url}`);
    } catch (error) {
      console.error(`Error al enviar a ${url}:`, error.message);
    }
  }
};
