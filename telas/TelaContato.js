import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContexto } from '../ProvedorAutenticacao';


const TelaContato = () => {
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [navbarImage, setNavbarImage] = useState(require('../assets/botoes/+.png'));

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

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Contato:</Text>
      <Text style={styles.textContent}> Bem-vindo à DualGames - {'\n'} onde a diversão é {'\n'} prioridade! Oferecemos {'\n'} uma seleção cuidadosa {'\n'} dos melhores jogos para {'\n'} todas as plataformas, {'\n'} com ofertas exclusivas {'\n'} para nossa comunidade {'\n'} de membros. Junte-se a {'\n'} nós e descubra o prazer {'\n'} dos jogos na DualGames!</Text>
      
      <View style={styles.container2}>
      <TouchableOpacity style={styles.emailButton}>
      <Text style={styles.emailText}>
        <Text>Email: </Text>
        <Text style={{ color: 'white' }}>dualgames@gmail.com</Text>
      </Text>
    </TouchableOpacity>

      <TouchableOpacity style={styles.emailButton}>
        <Text style={styles.emailText}>
        <Text>Telefone: </Text>
        <Text style={{ color: 'white' }}>(32) 9 1234 7700</Text>
      </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.button, styles.buttonC]} onPress={() => Linking.openURL('https://wa.me/55032998129960')}>
    <Image source={require('../assets/botoes/whatsapp.png')} style={styles.buttonCImg} resizeMode="contain" />
  </TouchableOpacity>
  <TouchableOpacity
      style={[styles.button, styles.buttonC]}
      onPress={() => Linking.openURL('https://www.instagram.com/aquino_lindo/')}
    >
      <Image source={require('../assets/botoes/insta.png')} style={styles.buttonCImg} resizeMode="contain" />
    </TouchableOpacity>
</View>

      </View>

      <Footer />
      <Navbar
        setShowExtraButton={setShowExtraButton}
        setNavbarImage={toggleNavbarImage}
        navbarImage={navbarImage}
      />
      {showExtraButton && <ExtraButton />}
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
  container2: {
    position: "relative",
    top: "20%",
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
  textTitle: {
    fontSize: 70,
    fontWeight: 'bold',
    color: "gold",
    position: "absolute",
    top: "10%",
    left: "25%"
  },
  textContent: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "yellow",
    position: "absolute",
    top: "22%",
    left: "30%"
  },
  emailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "gold",
    textDecorationLine: 'underline',
  },
  emailButton:{
    position: "relative",
    bottom: "-22%",
    left: "-10%",
    marginBottom: "2%"
  },
  buttonC: {
    marginLeft: "10%",
    position: "relative",
    left: "-50%",
    bottom: "-15%"
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
    top: '8%',
    left: '5%',
  },
  extraButton: {
    position: 'absolute',
    top: '15%',
    left: '-0%',
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
});

export default TelaContato;
