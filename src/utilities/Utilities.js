import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createUserDocument, updateProfileInfo } from '../controllers/FirestoreController';

GoogleSignin.configure({
    webClientId: '264575885411-sm1dvm252etoocaqengea7b5v0k85221.apps.googleusercontent.com',
});


export const CreateAccountWithEmailAndPassword = ({ email, password }) => {
    return auth().createUserWithEmailAndPassword(email, password);
}

export const SignInWithEmailAndPassword = ({ email, password }) => {
    return auth().signInWithEmailAndPassword(email, password);
}

export const signOutUser = () => {
    return auth().signOut()
}

export const SignInWithGoogle = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

    // Sign-in the user with the credential
    const result = await auth().signInWithCredential(googleCredential);

    // if (await checkNewUser(result.user.uid)) {
        const token = await auth().currentUser.getIdToken();
        console.log(token)
        await createUserDocument(result.user.uid, token)
        updateProfileInfo(result.user.uid, { email: userInfo.user.email })
    // }
}