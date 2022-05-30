import CryptoJS from 'crypto-js';


const generateMarvelAuthentication = () => {
    const API_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

    let ts = new Date().getTime();
    let message = CryptoJS.MD5(ts + PRIVATE_KEY + API_KEY);
    let hash = message.toString();
    let marvelAuth = `&ts=${ts}&apikey=${API_KEY}&hash=${hash}`
    
    return marvelAuth;
}

export default generateMarvelAuthentication;