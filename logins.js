import AsyncStorage from '@react-native-async-storage/async-storage';
import credentials from './db.json';

// Função para carregar as credenciais salvas no AsyncStorage
export const loadCredentials = async () => {
  try {
    const storedCredentials = await AsyncStorage.getItem('credentials');
    return storedCredentials != null ? JSON.parse(storedCredentials) : [];
  } catch (error) {
    console.error('Erro ao carregar as credenciais:', error);
    return [];
  }
};

// Função para salvar as credenciais no AsyncStorage
export const saveCredentials = async (newCredentials) => {
  try {
    await AsyncStorage.setItem('credentials', JSON.stringify(newCredentials));
  } catch (error) {
    console.error('Erro ao salvar as credenciais:', error);
  }
};
// Função para excluir uma credencial
export const deleteCredential = async (index) => {
  try {
    // Carregar as credenciais atuais do AsyncStorage
    const storedCredentials = await loadCredentials();

    // Remover o item da lista de credenciais
    storedCredentials.splice(index, 1);

    // Salvar a lista atualizada no AsyncStorage
    await saveCredentials(storedCredentials);
  } catch (error) {
    console.error('Erro ao excluir a credencial:', error);
  }
};


export { credentials };
