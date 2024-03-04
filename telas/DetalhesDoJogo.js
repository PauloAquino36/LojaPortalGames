import React, { useState, useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContexto } from '../ProvedorAutenticacao';

const DetalhesDoJogo = ({ route }) => {
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [navbarImage, setNavbarImage] = useState(require('../assets/botoes/+.png'));
  const {deslogar } = useContext(AutenticacaoContexto);
  const { definirUsuario } = useContext(AutenticacaoContexto);

  const toggleExtraButton = () => {
    setShowExtraButton(prevState => !prevState);
  };

  const toggleNavbarImage = () => {
    setNavbarImage(prevImage =>
      prevImage === require('../assets/botoes/+.png')
        ? require('../assets/botoes/-.png')
        : require('../assets/botoes/+.png')
    );
  };
  const { jogo } = route.params;
  const navigation = useNavigation(); 

  const comprarJogo = () => {
    if (!usuario) {
      navigation.navigate('TelaLogin');
      return; 
    } else {
      console.log("email:", usuario.email)
      fetch(`http://192.168.100.16:3000/membros/${usuario.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jogosComprados: [...usuario.jogosComprados, jogo.id] // Adiciona o ID do jogo comprado à lista existente de jogosComprados do membro
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao comprar o jogo');
        }
        Alert.alert(
          'Compra realizada',
          'Você comprou o jogo!',
          [
            { text: 'OK', onPress: () => {
                console.log('OK Pressed');
                loginAutomatico();
              }
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.error('Erro:', error);
        Alert.alert(
          'Erro',
          'Erro ao comprar o jogo. Tente novamente mais tarde.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      });
    }
  };
  
  const loginAutomatico = async () => {
    console.log("email:", usuario.email);
    console.log("password:", usuario.password);
    const usuario2 = {
      ...usuario
    };
    deslogar();
  
    definirUsuario(usuario2);

    navigation.navigate('TelaInicial');
    console.log("Login automático bem-sucedido");
  };

  
  
  const { usuario } = useContext(AutenticacaoContexto);
  const renderizarBotaoCompra = () => {
    if (!usuario || !usuario.jogosComprados || !usuario.jogosComprados.includes(jogo.id)) {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonLoja]} onPress={comprarJogo}>
          <Image source={require('../assets/botoes/loja.png')} style={styles.buttonContatosImg} resizeMode="contain" />
          <Text style={[styles.buttonLojaTexto]}>Comprar</Text>
          <Text style={styles.itemPrice}>R$ {jogo.preco.toFixed(2)}</Text>
        </TouchableOpacity>
        
      );
    } else {
      return null;
    }
  };
  

  return (
    <View style={styles.container}>
      <Navbar
        setShowExtraButton={setShowExtraButton}
        setNavbarImage={toggleNavbarImage}
        navbarImage={navbarImage}
      />
      {showExtraButton && <ExtraButton />}
      <Image source={jogo.foto} style={styles.itemImage} />
      <Text style={styles.itemName}>{jogo.nome}</Text>
      <Text style={styles.itemDescription}>{jogo.descricao}</Text>
      {renderizarBotaoCompra()}

      <Footer />
    </View>
  );
};
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
  const { usuario } = useContext(AutenticacaoContexto); // Obtém as informações do usuário do contexto de autenticação

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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    backgroundColor: '#222227',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  textContent: {
    fontSize: 20,
    fontWeight: 'bold',
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
  buttonNavbar: {
    width: 50,
    height: 50,
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
  configButton: {
    position: 'absolute',
    top: '15%',
    left: '-20%',
  },
  configButtonImg: {
    width: 92,
  },
  itemImage: {
    width: "40%",
    height: "20%",
    position: "absolute",
    top: "10%",
    zIndex: 0,
    borderColor: "purple",
    borderWidth: 2
  },
  itemName: {
    position: "absolute",
    top: "31%",
    fontSize: 16,
    fontWeight: 'bold',
    color: "white"
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: "gray",
    width: "90%",
    position: "absolute",
    top: "34%",
  },
  itemPrice: {
    fontSize: 18,
    color: 'red',
    position: "absolute",
    top: "130%",
    left: "10%",
  },
  buttonLojaTexto:{
    color: 'gold',
    fontSize: 15,
    position: "absolute",
    top: "100%",
  },
  buttonLoja:{
    color: 'gold',
    fontSize: 15,
    position: "absolute",
    top: "10%",
    right: "5%",
  }
});

export default DetalhesDoJogo;
