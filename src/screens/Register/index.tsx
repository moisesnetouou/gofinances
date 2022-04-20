import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { 
  Keyboard, 
  Modal, 
  Alert
} from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {yupResolver} from '@hookform/resolvers/yup';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import {CategorySelect} from '../CategorySelect'
import {InputForm} from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().
  required('Nome é obrigatório'),
  amount: Yup.number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dataKey = '@gofinances:transactions'

  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [category, setCategory] = useState({
    key: 'category',
    name: "Categoria",
  });

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: Partial<FormData>){
    if(!transactionType){
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category'){
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData, 
        newTransaction
      ]
      

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar")
    }
  }

  useEffect(()=> {
    async function loadData(){
      const data = await AsyncStorage.getItem(dataKey);

      console.log(JSON.parse(data!));
    }

    loadData();
    // async function removeAll(){
    //   await AsyncStorage.removeItem(dataKey);
    // }
    // removeAll();
  }, [])

  return(
    // fecha o teclado em qualquer area
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss}
      containerStyle={{flex: 1}}
      style={{flex: 1}}
    > 
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
                name="name"
                control={control} 
                placeholder="Nome"
                autoCapitalize="sentences" // primeira letra em maiusculo.
                autoCorrect={false} // tenta corrigir automatico desabilitado
                error={errors.name && errors.name.message}
              />

            <InputForm
              name="amount"
              control={control}   
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton 
                type="up"
                title="Income"
                onPress={()=> handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />

              <TransactionTypeButton 
                type="down"
                title="Outcome"
                onPress={()=> handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>
         
            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
         
          </Fields>
          
          <Button 
            title="Enviar"            
            onPress={handleSubmit(handleRegister)} 
          />
          
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}