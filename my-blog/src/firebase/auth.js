import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

//* Create user:
export const doCreateUserWithEmailAndPassword = (email, password) => {

    return createUserWithEmailAndPassword(auth, email, password);
};

//* Signin / Login user:
export const doSignInWithEmailAndPassword = (email, password) => {

    return signInWithEmailAndPassword(auth, email, password);
};

//* Signout / Logout user:
export const doSignOut = () => {

    return auth.signOut();
};

// TODO: Password reset
// export const doPasswordReset = (email) => {

//     return sendPasswordResetEmail(auth, email);
// };

// TODO: Password Change
// export const doPasswordChange = (password) => {

//     return updatePassword(auth.currentUser, password);
// };

// TODO: Email Verification
// export const doSendEmailVeification = () => {

//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/`,
//     });
// };