import React, { createContext, useState } from 'react';

// Criar o contexto de autenticação
export const AutenticacaoContexto = createContext();

// Criar o provedor de autenticação
export const ProvedorAutenticacao = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Função para definir as informações do usuário
  const definirUsuario = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

  // Função para deslogar o usuário
  const deslogar = () => {
    setUsuario(null);
  };

  // Objeto de valor do contexto
  const valorContexto = {
    usuario,
    definirUsuario,
    deslogar,
  };

  // Retornar o provedor de autenticação com o contexto
  return (
    <AutenticacaoContexto.Provider value={valorContexto}>
      {children}
    </AutenticacaoContexto.Provider>
  );
};
