import React, { createContext, useState, useContext } from 'react';

// Criar o contexto de autenticação
const AutenticacaoContexto = createContext();

// Criar o provedor de autenticação
export const ProvedorAutenticacao = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Armazenar informações do usuário

  // Função para definir as informações do usuário
  const definirUsuario = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

  // Objeto de valor do contexto
  const valorContexto = {
    usuario,
    definirUsuario,
  };

  // Retornar o provedor de autenticação com o contexto
  return (
    <AutenticacaoContexto.Provider value={valorContexto}>
      {children}
    </AutenticacaoContexto.Provider>
  );
};

// Criar um hook personalizado para acessar o contexto de autenticação
export const useAutenticacao = () => {
  return useContext(AutenticacaoContexto);
};

export default AutenticacaoContexto;
