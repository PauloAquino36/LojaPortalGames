import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContexto } from '../ProvedorAutenticacao';

const TelaRegistro = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      // Verifique se todos os campos foram preenchidos
      if (!firstName || !lastName || !phone || !email || !password || !dateOfBirth) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }
  
      // Verifique se a data de nascimento possui todos os dígitos
      if (dateOfBirth.length !== 10) {
        Alert.alert('Erro', 'Por favor, insira a data de nascimento completa (DD/MM/AAAA).');
        return;
      }
    
      // Verifique se o email já está cadastrado
      const emailCheckResponse = await fetch(`http://192.168.100.16:3000/membros?email=${email}`);
      const emailCheckData = await emailCheckResponse.json();
      if (emailCheckData.length > 0) {
        Alert.alert('Erro', 'Este email já está registrado. Por favor, use outro.');
        return;
      }
  
      // Verifique se o número de telefone já está cadastrado
      const phoneCheckResponse = await fetch(`http://192.168.100.16:3000/membros?phone=${phone}`);
      const phoneCheckData = await phoneCheckResponse.json();
      if (phoneCheckData.length > 0) {
        Alert.alert('Erro', 'Este número de telefone já está registrado. Por favor, use outro.');
        return;
      }
  
      // Enviar dados do usuário para a API
      const response = await fetch('http://192.168.100.16:3000/membros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          password,
          dateOfBirth,
          cargo: 'Novato(a)',
        }),
      });
    
      if (!response.ok) {
        throw new Error('Erro ao registrar usuário.');
      }
    
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Erro ao registrar usuário. Por favor, tente novamente.');
    }
  };
  
  
  
  

  const handlePhoneInput = (input) => {
    // Remove todos os caracteres não numeros
    const formattedPhone = input.replace(/[^0-9]/g, '');
    setPhone(formattedPhone);
  };

  const handleDateInput = (input) => {
    const formattedDate = input.replace(/[^0-9]/g, '');
    
    if (formattedDate.length <= 8) {
      // (DD/MM/AAAA)
      let result = '';
      for (let i = 0; i < formattedDate.length; i++) {
        if (i === 2 || i === 4) {
          result += '/' + formattedDate[i];
        } else {
          result += formattedDate[i];
        }
      }
      setDateOfBirth(result);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icone.png')} style={styles.imgRegistro} resizeMode="contain" />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Primeiro Nome:"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Último Nome:"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone:"
          value={phone}
          onChangeText={handlePhoneInput}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA):"
          value={dateOfBirth}
          onChangeText={handleDateInput} 
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail:"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha:"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonRegistro} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar-se</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
  
}

const Footer = () => {
  const navigation = useNavigation();
  const { usuario } = useContext(AutenticacaoContexto);
  const renderizarBotaoUser = () => {
    if (usuario) {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonUsers]}  onPress={() => navigation.navigate('TelaUsers')}>
          <Image source={require('../assets/botoes/users.png')} style={styles.buttonUsersImg} resizeMode="contain" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonUsers]}  onPress={() => navigation.navigate('TelaLogin')}>
          <Image source={require('../assets/botoes/users.png')} style={styles.configButtonImg} resizeMode="contain" />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.footer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonContatos]} onPress={() => navigation.navigate('TelaContato')}>
          <Image source={require('../assets/botoes/contatos.png')} style={styles.buttonContatosImg} resizeMode="contain" />
        </TouchableOpacity>
        {renderizarBotaoUser()}
        <TouchableOpacity style={[styles.button, styles.buttonHome]}  onPress={() => navigation.navigate('TelaInicial')}>
          <Image source={require('../assets/botoes/home.png')} style={styles.buttonHomeImg} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonMembros]} onPress={() => navigation.navigate('TelaMembros')}>
          <Image source={require('../assets/botoes/membros.png')} style={styles.buttonMembrosImg} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919'
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 22,
    position: "relative",
    top: "5%"
  },
  imgRegistro: {
    width: "80%",
    height: "80%",
    position: 'absolute',
    bottom: "40%"
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    backgroundColor: '#222227',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContatos: {
    position: 'relative',
    left: '0%',
  },
  buttonContatosImg: {
    width: 92,
  },
  buttonUsers: {
    position: 'relative',
    left: '0%',
  },
  buttonUsersImg: {
    width: 92,
  },
  buttonHome: {
    position: 'relative',
    left: '0%',
  },
  buttonHomeImg: {
    width: 92,
  },
  buttonMembros: {
    position: 'relative',
    left: '5%',
  },
  buttonMembrosImg: {
    width: 92,
  },
  buttonRegistro: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TelaRegistro;
