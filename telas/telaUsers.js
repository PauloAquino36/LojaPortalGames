import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContexto } from '../ProvedorAutenticacao';
import jogos from '../jogos';

const TelaUsers = () => {
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [navbarImage, setNavbarImage] = useState(require('../assets/botoes/+.png'));
  const { usuario, deslogar } = useContext(AutenticacaoContexto);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredJogos, setFilteredJogos] = useState(jogos);
  const [modalVisible, setModalVisible] = useState(false);
  

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

  const handleSearch = (text) => {
    setSearchValue(text);
    const filtered = jogos.filter(jogo =>
      jogo.nome.toLowerCase().includes(text.toLowerCase()) ||
      jogo.descricao.toLowerCase().includes(text.toLowerCase()) ||
      jogo.preco.toFixed(2).includes(text.toLowerCase())
    );
    setFilteredJogos(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('DetalhesDoJogo', { jogo: item })}>
      <Image source={item.foto} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.nome}</Text>
    </TouchableOpacity>
  );
  
  const jogosCompradosPeloUsuario = usuario ? usuario.jogosComprados : []; // IDs dos jogos comprados pelo usuário
  const jogosCompradosPeloUsuarioObjetos = jogos.filter(jogo => jogosCompradosPeloUsuario.includes(jogo.id)); // Jogos comprados pelo usuário
  

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você vai sair de sua conta?</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#FF6347' }}
                onPress={() => {
                  navigation.navigate('TelaInicial');
                  deslogar();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#4682B4', marginLeft: 10 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showSearchBar && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchValue}
          onChangeText={handleSearch}
        />
      )}
      <View style={styles.info}>
        <TouchableOpacity style={styles.sair} onPress={() => setModalVisible(true)}>
          <Text style={styles.inicial}>
            {usuario ? `${usuario.firstName.charAt(0)} ${usuario.lastName.charAt(0)}` : 'Usuário'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.nome}>{usuario ? usuario.firstName : 'Usuário'} {usuario ? usuario.lastName : 'Usuário'}</Text>
        <Text style={styles.nome}>Cargo: {usuario ? usuario.cargo : 'Usuário'}</Text>
      </View>
      <Text style={styles.meusJogos}>Meus jogos:</Text>
      <FlatList
    data={jogosCompradosPeloUsuarioObjetos}
    renderItem={renderItem}
    keyExtractor={item => item.id.toString()}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
    numColumns={3}
    style={{ marginTop: "50%" }}
  />
      <Footer />
      <Navbar
        setShowExtraButton={setShowExtraButton}
        setNavbarImage={toggleNavbarImage}
        navbarImage={navbarImage}
      />
      {showExtraButton && <ExtraButton />}
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
    top: '8%',
    left: '8%',
  },
  extraButton: {
    position: 'absolute',
    top: '15%',
    left: '3%',
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
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "purple",
    textAlign: 'left',
  },
  inicial: {
    fontSize: 80,
    fontWeight: 'bold',
    color: "gold",
    backgroundColor: "white",
    borderRadius: 40,
    borderColor: "purple",
    borderWidth: 2,
    textAlign: 'center',
  },
  info: {
    position: "absolute",
    top: "7%",
    left: "55%"
  },
  meusJogos: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "gold",
    textAlign: 'left',
    position: "relative",
    top: "23%",
    left: "-20%"
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderWidth: 1, 
    borderColor: 'purple',
  },
  itemImage: {
    width: '100%', 
    height: 100,
    resizeMode: 'contain', 
  },
  itemName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    width: '60%',
    color: "purple",
    borderColor: 'purple',
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    position: "absolute",
    bottom: '85%',
    left: '30%',
    zIndex: 5 
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919'
  },
});

export default TelaUsers;
