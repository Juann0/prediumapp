import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Librería para importar iconos
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [identificacion, setIdentificacion] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = () => {
        if (!identificacion.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }
        const idPattern = /^\d+$/;
        if (!idPattern.test(identificacion)) {
            Alert.alert('Error', 'La identificación debe contener solo números.');
            return;
        }

        const requestBody = {
            identificacion,
            password
        };

        fetch('http://192.168.20.178:3000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de red.');
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    console.log('Token JWT recibido:', data.token);
                    AsyncStorage.setItem('token', data.token)
                        .then(() => {
                            console.log('Token JWT guardado en AsyncStorage');
                            // Aquí se navega a otra pantalla o se realiza otra acción Juan Diego es decir, cuando se autoriza el login
                        })
                        .catch(error => {
                            console.error('Error al guardar el token en AsyncStorage:', error.message);
                        });
                } else {
                    console.error('No se recibió el token JWT');
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error.message);
            });
    };


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('./../assets/logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Identificación'
                    value={identificacion}
                    keyboardType='number-pad'
                    onChangeText={(text) => setIdentificacion(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                    style={styles.visibilityButton}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputButton}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={styles.forgotPassword}>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 40
    },
    logo: {
        width: 150,
        height: 150,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        position: 'relative',
    },
    inputButton: {
        width: '80%',
        marginBottom: 20,
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 10
    },
    visibilityButton: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    button: {
        backgroundColor: '#1CAD6D',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        height: 45,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        verticalAlign: 'middle',
    },
    forgotPassword: {
        marginTop: 15,
        textAlign: 'center',
        color: '#0F633D'
    },
});

export default LoginScreen;