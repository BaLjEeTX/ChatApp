import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';

import { auth } from '../config/firebase';
import backImage from '../assets/background.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.form}
        >
          <Text style={styles.title}>Welcome Back 👋</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            secureTextEntry
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.footerText}>
            <Text style={styles.footerLabel}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: '#F7CFD8',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  safe: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#F1F1F3',
    height: 54,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#8E7DBE',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLabel: {
    color: '#555',
    fontSize: 14,
    fontWeight: '500',
  },
  footerLink: {
    color: '#FF6C87',
    fontSize: 14,
    fontWeight: '600',
  },
});
