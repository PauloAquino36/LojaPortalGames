import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContexto } from '../ProvedorAutenticacao'; 


const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [navbarImage, setNavbarImage] = useState(require('../assets/botoes/+.png'));
  const { definirUsuario } = useContext(AutenticacaoContexto);

  const toggleExtraButton = () => {
    setShowExtraButton(prevState => !prevState);
  }

  const toggleNavbarImage = () => {
    setNavbarImage(prevImage =>
      prevImage === require('../assets/botoes/+.png')
        ? require('../assets/botoes/-.png')
        : require('../assets/botoes/+.png')
    );
  };

  const handleLogin = async () => {
    try {
      // Verifique se o email e a senha estão preenchidos
      if (!email || !password) {
        Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
        return;
      }
      
      const response = await fetch(`http://192.168.100.16:3000/membros?email=${email}&password=${password}`);
      const data = await response.json();

      if (data.length === 0) {
        Alert.alert('Erro', 'E-mail ou senha inválidos.');
      } else {
        definirUsuario(data[0]);
        
        navigation.navigate('TelaInicial');
        console.log("Login bem-sucedido:", data[0]);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('TelaRegistro');
  };

  return (
    <View style={styles.container}>
      <Navbar
        setShowExtraButton={setShowExtraButton}
        setNavbarImage={toggleNavbarImage}
        navbarImage={navbarImage}
      />
      {showExtraButton && <ExtraButton />}
      <Image source={require('../assets/icone.png')} style={styles.imgLogin} resizeMode="contain" />
      <View style={styles.formContainer}>
        <Text style={styles.title}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.title}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>Registrar-se</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
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

const Navbar = ({ setShowExtraButton, setNavbarImage, navbarImage }) => {
  const handlePress = () => {
    setShowExtraButton(prevState => !prevState);
    setNavbarImage();
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image source={navbarImage} style={styles.buttonNavbar} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const ExtraButton = () => {
  const navigation = useNavigation();
  const { usuario } = useContext(AutenticacaoContexto);

  const renderizarBotaoGerenciamento = () => {
    if (usuario) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaGerenciamento')}>
          <Image source={require('../assets/botoes/config.png')} style={styles.configButtonImg} resizeMode="contain" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaLogin')}>
          <Image source={require('../assets/botoes/config.png')} style={styles.configButtonImg} resizeMode="contain" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.extraButton}>
       <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('TelaInicial')}>
        <Image source={require('../assets/botoes/x.png')} style={styles.extraButtonImg} resizeMode="contain" />
      </TouchableOpacity>
      {renderizarBotaoGerenciamento()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919'
  },
  formContainer: {
    position: "relative",
    bottom: "-3%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
    color: "white",
    position: "relative",
    left: "0%",
    top: "5%"
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
  imgLogin: {
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
  buttonLogin: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: "relative",
    left: "250%",
    width: "30%"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  navbar: {
    position: 'absolute',
    top: '7.5%',
    left: '5%',
    zIndex: 1,
  },
  extraButton: {
    position: 'absolute',
    top: '15%',
    left: '0%',
    zIndex: 1,
  },
  extraButtonImg: {
    width: 92,
  },
});

export default TelaLogin;
