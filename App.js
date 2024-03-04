import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './telas/TelaInicial';
import TelaLogin from './telas/TelaLogin';
import TelaRegistro from './telas/TelaRegistro';
import DetalhesDoJogo from './telas/DetalhesDoJogo';
import TelaContato from './telas/TelaContato';
import TelaMembros from './telas/TelaMembros';
import TelaGerenciamento from './telas/TelaGerenciamento';
import TelaRegistro2 from './telas/TelaRegistro2';
import TelaUsers from './telas/telaUsers';
import { ProvedorAutenticacao } from './ProvedorAutenticacao';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ProvedorAutenticacao>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="DetalhesDoJogo" component={DetalhesDoJogo} />
          <Stack.Screen name="TelaLogin" component={TelaLogin} />
          <Stack.Screen name="TelaContato" component={TelaContato} />
          <Stack.Screen name="TelaMembros" component={TelaMembros} />
          <Stack.Screen name="TelaRegistro" component={TelaRegistro} />
          <Stack.Screen name="TelaRegistro2" component={TelaRegistro2} />
          <Stack.Screen name="TelaGerenciamento" component={TelaGerenciamento} />
          <Stack.Screen name="TelaUsers" component={TelaUsers} />
        </Stack.Navigator>
      </ProvedorAutenticacao>
    </NavigationContainer>
  );
}
