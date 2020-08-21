import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import styles from './styles';
import api from '../../services/api';


const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  const state = {
    index: 0
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });
        
        setFavorites(favoritedTeachersId);
      }
    });
  }

  const handleToggleFiltersVisible = () => {
    setAreFiltersVisible(!areFiltersVisible);
  }

  const handleFiltersSubmit = async () => {
    loadFavorites();
    
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });
    
    setAreFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={(
        <BorderlessButton onPress={handleToggleFiltersVisible}>
          <Feather name="filter" size={20} color="#FFF"/>
        </BorderlessButton>
      )}>
          { areFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <Picker
                style={styles.input}
                selectedValue={subject}
                onValueChange={(target) => setSubject(target)}
              >
                <Picker.Item label="Artes" value="Artes"/>
                <Picker.Item label="Biologia" value="Biologia"/>
                <Picker.Item label="Química" value="2"/>
                <Picker.Item label="Educação Física" value="Educação Física"/>
                <Picker.Item label="Física" value="Física"/>
                <Picker.Item label="Geografia" value="Geografia"/>
                <Picker.Item label="História" value="História"/>
                <Picker.Item label="Matemática" value="Matemática"/>
                <Picker.Item label="Português" value="Português"/>
                <Picker.Item label="Inglês" value="Inglês"/>

              </Picker>
              {/* <TextInput 
                style={styles.input}
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholder="Qual a matéria?"
                placeholderTextColor="#C1BCCC"
              /> */}

              <View style={styles.inputGroup}>
                
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <Picker
                    itemStyle={{ color: '#7159C1',}}
                    style={styles.input}
                    selectedValue={week_day}
                    onValueChange={(target) => setWeek_day(target)}
                  >
                    <Picker.Item label="Domingo" value="0"/>
                    <Picker.Item label="Segunda-feira" value="1"/>
                    <Picker.Item label="Terça-feira" value="2"/>
                    <Picker.Item label="Quarta-feira" value="3"/>
                    <Picker.Item label="Quinta-feira" value="4"/>
                    <Picker.Item label="Sexta-feira" value="5"/>
                    <Picker.Item label="Sábado" value="6"/>

                  </Picker>
                  {/* <TextInput 
                    style={styles.input}
                    value={week_day}
                    onChangeText={text => setWeek_day(text)}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#C1BCCC"
                  /> */}
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Hora</Text>
                  <RectButton onPress={showDatePicker}>
                    <Text>Show picker time</Text>
                  </RectButton>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    display="spinner"
                    mode="time"
                    onConfirm={(hour) => handleConfirm(hour)}
                    onCancel={hideDatePicker}
                  />
                  
                  {/* <TextInput 
                    style={styles.input}
                    value={time}
                    onChangeText={text => setTime(text)}
                    placeholder="Qual o horário?"
                    placeholderTextColor="#C1BCCC"
                  /> */}
                </View>
              </View>

              <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>

            </View>
          )} 
      </PageHeader>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}  
            />)
          })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;