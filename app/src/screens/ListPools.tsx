import { VStack, Icon } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { Octicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from "../services/api";


export function ListPools() { 

  const { navigate } = useNavigation()
  return (
    <VStack flex={1} bgColor="gray.900">

      <Header title="Meus bolões"/> 
      <VStack mt={8} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
        leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        title="BUSCAR BOLÃO POR CÓDIGO"
        onPress={() => navigate('findPool')}/>
      </VStack> 
    </VStack> 
  )
}
