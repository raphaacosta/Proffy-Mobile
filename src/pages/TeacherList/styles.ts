import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 16,
  },

  label: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
  },

  input: {
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 2,
    marginBottom: 10,
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  submitButton: {
    backgroundColor: '#04D361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },

  inputBlock: {
    width: '48%',
  },

});

export default styles;