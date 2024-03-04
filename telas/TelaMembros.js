import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContexto } from '../ProvedorAutenticacao';

const ITEMS_PER_PAGE = 10;

const ModalContent = ({ modalVisible, selectedMember, setModalVisible }) => {
  return (
    <View style={styles.modalContent}>
      {modalVisible && selectedMember && (
        <>
          <Text style={styles.modalTitle}>Detalhes do Membro</Text>
          <Text>Nome: {selectedMember.firstName} {selectedMember.lastName}</Text>
          <Text>Email: {selectedMember.email}</Text>
          <Text>Telefone: {selectedMember.phone}</Text>
          <Text>Data: {selectedMember.dateOfBirth}</Text>
          <Text>Cargo: {selectedMember.cargo}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const TelaMembros = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showExtraButton, setShowExtraButton] = useState(false);
  const [navbarImage, setNavbarImage] = useState(require('../assets/botoes/+.png'));

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://192.168.100.16:3000/membros');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Erro ao carregar os membros:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    setCurrentPage(0);
  };

  const filteredData = members.filter(member =>
    (member.firstName && member.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
    (member.lastName && member.lastName.toLowerCase().includes(searchValue.toLowerCase())) ||
    (member.cargo && member.cargo.toLowerCase().includes(searchValue.toLowerCase()))
  );
  

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(currentPage * ITEMS_PER_PAGE, (currentPage * ITEMS_PER_PAGE) + ITEMS_PER_PAGE);

  const nextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMemberPress = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const renderMemberItem = ({ item }) => (
    <TouchableOpacity style={styles.memberRow} onPress={() => handleMemberPress(item)}>
      <Text style={styles.memberName}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.memberCargo}>{item.cargo}</Text>
    </TouchableOpacity>
  );

  const toggleSearchBar = () => {
    setShowSearchBar(prevState => !prevState);
  };

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
      <Image source={require('../assets/botoes/membros.png')} style={styles.membros} resizeMode="contain" />
      {showSearchBar && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchValue}
          onChangeText={handleSearch}
        />
      )}
      <FlatList
        style={styles.tableContainer}
        data={paginatedData}
        renderItem={renderMemberItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.paginationButton} onPress={prevPage}>
          <Text style={styles.paginationButtonText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.currentPageText}>{currentPage + 1}</Text>
        <TouchableOpacity style={styles.paginationButton} onPress={nextPage}>
          <Text style={styles.paginationButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
      <Footer />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <ModalContent
            modalVisible={modalVisible}
            selectedMember={selectedMember}
            setModalVisible={setModalVisible}
          />
        </View>
      </Modal>
      <Navbar
        toggleSearchBar={toggleSearchBar}
        toggleExtraButton={toggleExtraButton}
        setNavbarImage={toggleNavbarImage}
        navbarImage={navbarImage}
        showExtraButton={showExtraButton}
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

const Navbar = ({ toggleSearchBar, toggleExtraButton, setNavbarImage, navbarImage, showExtraButton }) => {
  const handlePress = () => {
    toggleSearchBar();
    toggleExtraButton();
    setNavbarImage();
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image source={navbarImage} style={styles.buttonNavbar} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

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
  tableContainer: {
    flex: 1,
    width: '80%',
    height: '50%',
    position: "absolute",
    bottom: "20%",
    backgroundColor: 'white'
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  memberName: {
    fontWeight: 'bold',
  },
  memberCargo: {
    color: 'gray',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    position: "absolute",
    bottom: "13%"
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  currentPageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: "purple"
  },
  membros:{
    position: "absolute",
    top: '17.5%'
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TelaMembros;
