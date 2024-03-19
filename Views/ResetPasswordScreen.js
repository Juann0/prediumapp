import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({ navigation }) => {
    const [identificacion, setIdentificacion] = useState('');

    const handleSubmit = () => {
        if (!identificacion.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }
        const idPattern = /^\d+$/;
        if (!idPattern.test(identificacion)) {
            Alert.alert('Error', 'La identificación debe contener solo números.');
            return;
        }

        AsyncStorage.getItem('token').then(token => {
            if (token) {
                fetch('http://192.168.20.178:3000/protected', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                })
                    .then(response => {
                        // if (!response.ok) {
                        //     switch (response.status) {
                        //         case 401:
                        //             return console.log('Error', `Code error ${response.status} Unauthorized`);
                        //             break;

                        //         default:
                        //             break;
                        //     }
                        // }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Respuesta del servidor:', data);
                    })
                    .catch(error => {
                        console.error('Error al enviar la solicitud:', error.message);
                    });
            } else {
                console.error('No se encontró el token JWT en AsyncStorage');
            }
        }).catch(error => {
            console.error('Error al obtener el token JWT:', error.message);
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
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Restablecer contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.forgotPassword}>
                    <Text style={styles.forgotPassword}>Volver al incio</Text>
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

export default ResetPasswordScreen;