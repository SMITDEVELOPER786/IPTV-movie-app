import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../assets/images/Thumb.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Login to access your account</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="john.doe@gmail.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="••••••••••••••••••"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? (
                <Eye size={22} color="#fff" />
              ) : (
                <EyeOff size={22} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.rememberRow}>
            <View style={styles.rememberWrapper}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkbox}
              >
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.8 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Or login with */}
          <View style={styles.orCon}>
            <View style={styles.dashed}></View>
            <Text style={styles.orText}>Or login with</Text>
            <View style={styles.dashed}></View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    width: 500,
    padding: 24,
    borderRadius: 12,
    marginLeft: 50,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#79747E',
    textAlign: 'left',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
    position: ' relative',
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
    backgroundColor: '#13141C',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -8,
    left: 10,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#13141C',
    borderRadius: 3,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#79747E',
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  eyeIcon: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 8,
    top: 12,
  },
 
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    color: '#3b82f6', // blue-500
    fontSize: 14,
    fontWeight: 'bold',
  },
  rememberText: {
    color: '#fff',
    fontSize: 13,
  },
  forgotText: {
    color: '#f87171', // red-400
    fontSize: 13,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#515DEF', // Tailwind blue-500
    paddingVertical: 14,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#515DEF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  orText: {
  
    textAlign: 'center',
    color: '#313131',
    fontSize: 13,
  },
  dashed: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#313131',
    borderStyle: 'dashed',
    marginHorizontal: 10,
  },
  orCon: { flexDirection: 'row', alignItems: 'center' , marginTop: 40},
});
