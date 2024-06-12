import { GoogleLogin } from '@react-oauth/google';

export default function ButtonGoogleLogin() {
    // const clientId = "227484398872-eic94qt52o2kfhstnlfk54akki53p174.apps.googleusercontent.com";

    return (
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    )
}