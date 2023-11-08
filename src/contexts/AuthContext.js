import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({children}) => {
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingApp, setLoadingApp] = useState(true);
  const [isSendingResetLink, setSendingLink] = useState(false);
  const [isLoadingPhoto, setLoadingPhoto] = useState(false);

  useEffect(() => {
    loadData();
    //signOut();
  }, []);

  async function savePhoto(path) {
    setLoadingPhoto(true);
    const docRef = firestore().collection('users').doc(user.user_id);

    const storagePath = await getPhotoUrl(path);
    console.log('STORAGEPATH: ' + storage);
    if (storagePath == '') {
      console.log('não foi possivel salvar a foto no storage');
      return 404;
    } else {
      try {
        await docRef.set({
          profile_photo: path,
        });
        console.log('imagem salva no banco de dados');
        await updatePhotoOnAsyncStorage(path);
        return 200;
      } catch (error) {
        console.log('erro ao salvar imagem no banco de dados: ' + error);
        return 401;
      }
    }
  }

  async function getPhotoUrl(file_on_memory) {
    const miliseconds = String(Date.now());

    try {
      const storageRef = await storage().ref('users/photos').child(miliseconds);
      console.log('STORAGEREF: ' + storageRef);
      await storageRef.putFile(file_on_memory);
      const caminho = await storageRef.getDownloadURL();
      console.log(caminho);
      return caminho;
    } catch (error) {
      console.log('erro: ' + error);
      // Alert.alert('Aconteceu algum erro ao adicionar o game!');
      return '';
    }
  }
  async function updatePhotoOnAsyncStorage(profilePhoto) {
    try {
      const userData = await AsyncStorage.getItem('@userData');
      if (userData !== null) {
        const data = JSON.parse(userData);
        data.profile_photo = profilePhoto;

        //Salvando o objeto atualizado no AsyncStorage
        await AsyncStorage.setItem('@userData', JSON.stringify(data));

        console.log('Atributo do objeto atualizado com sucesso!');
        setLoadingPhoto(false);
      } else {
        console.log('Chave não encontrada no AsyncStorage.');
        setLoadingPhoto(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar o atributo do objeto:', error);
      setLoadingPhoto(false);
    }
  }
  async function forgotPassword(email) {
    setSendingLink(true);
    try {
      await auth().sendPasswordResetEmail(email);
      setSendingLink(false);
      return 'success';
    } catch (error) {
      setSendingLink(false);
      return error.code;
    }
  }
  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
        console.log('saiu');
      })
      .catch(e => {
        console.log(e);
      });
  }

  async function loadData() {
    setLoadingApp(true);
    try {
      const ud = await AsyncStorage.getItem('@userData');

      if (ud) {
        const userData = JSON.parse(ud);
        console.log(userData);
        setUser(userData);
      }
    } catch (error) {
      console.log(`error - AuthContext - loadData(): ${error}`);
    } finally {
      setLoadingApp(false);
    }
  }

  async function login(email, password) {
    setLoadingAuth(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      const userData = {
        uid: response.user.uid,
        email: response.user.email,
      };

      writeUserData(userData);
    } catch (error) {
      //return error.code;
      if (error.code == 'auth/invalid-login') return 400;
      else if (error.code == 'auth/user-not-found') return 404;
      else if (error.code == 'auth/wrong-password') return 406;
      else if (error.code == 'auth/too-many-requests') return 504;
      console.log(error.code);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signUp(name, email, phone, password) {
    setLoadingAuth(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const isUserCreated = registerOnFirestore(
        response.user.uid,
        name,
        email,
        phone,
      );
      return isUserCreated ? 200 : 500;
    } catch (error) {
      if (error.code == 'auth/invalid-email') return 400;
      else if (error.code == 'auth/weak-password') return 411;
      else if (error.code === 'auth/email-already-in-use') return 406;
      else console.log(error.code);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function registerOnFirestore(uid, name, email, phone) {
    const docRef = firestore().collection('users').doc(uid);
    try {
      docRef.set({
        isAdmin: false,
        name: name,
        email: email,
        phone: phone,
        user_id: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.log('error on creating user - registerOnFirestore: ' + error);
      return false;
    }
  }

  function writeUserData(data) {
    console.log(data);
    AsyncStorage.setItem('@userData', JSON.stringify(data));
    // loadData();
    setUser(data);
  }
  return (
    <FirebaseContext.Provider
      value={{
        signUp,
        login,
        isLoadingAuth,
        isLoadingApp,
        signed: !!user,
        user,
        setLoadingAuth,
        forgotPassword,
        isSendingResetLink,
        savePhoto,
        isLoadingPhoto,
        signOut,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
