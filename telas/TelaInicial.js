import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jogos from '../jogos';
import { AutenticacaoContexto } from '../ProvedorAutenticacao';
 
const TelaInicial = () => {
  const navigation = useNavigation();
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [navbarImage, setNavbarImage] = useState(require('../assets/botoes/+.png'));
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredJogos, setFilteredJogos] = useState(jogos);

  const toggleNavbarImage = () => {
    setNavbarImage(prevImage =>
      prevImage === require('../assets/botoes/+.png')
        ? require('../assets/botoes/-.png')
        : require('../assets/botoes/+.png')
    );
    setShowSearchBar(prevState => !prevState);
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
      <Text style={styles.itemDescription}>{item.descricao.substring(0, 50)}...</Text>
      <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {showSearchBar && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchValue}
          onChangeText={handleSearch}
        />
      )}
      <Text style={styles.textContent}>
        Descubra, compre, jogue. PortalGames - {"\n"}
        sua escolha para os melhores jogos. {"\n"}
        Ofertas exclusivas, avaliações confiáveis. {"\n"}
        A diversão está a um toque de distância!
      </Text>

      <TouchableOpacity style={[styles.button, styles.buttonLoja]}>
        <Image source={require('../assets/botoes/loja.png')} style={styles.buttonContatosImg} resizeMode="contain" />
      </TouchableOpacity>

      <Text style={styles.title}>Jogos Disponíveis</Text>
      <FlatList
        data={filteredJogos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
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
  const { usuario } = useContext(AutenticacaoContexto); // Obtém as informações do usuário do contexto de autenticação

  // Verifica se o usuário está logado e exibe o botão de acordo
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
    color: 'gold',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'relative',
    bottom: '32%',
    left: '15%'
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
  buttonLoja: {
    position: 'relative',
    left: '35%',
    bottom: '30%',
  },
  buttonNavbar: {
    width: 50,
    height: 50,
  },
  navbar: {
    position: 'absolute',
    top: '7%',
    left: '2%',
  },
  extraButton: {
    position: 'absolute',
    top: '15%',
    left: '0%',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    position: "relative",
    bottom: '2%',
    color: "gold"
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "relative",
    bottom: '0%'
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  itemImage: {
    width: 150,
    height: 150,
    borderColor: "purple",
    borderWidth: 1
  },
  itemName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: "white"
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: "gray"
  },
  itemPrice: {
    fontSize: 14,
    color: "white"
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
    zIndex: 0
  }
});

export default TelaInicial;