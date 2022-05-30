import axios from 'axios';
import CryptoJS from 'crypto-js';
//import { HeroObj, HeroInfoObj } from "../entities/HeroObj";
//const { baseAPI, key } = require("../shared/baseApi");


class CharacterSearches {
    constructor(baseUrl, publicKey, privateKey) {
        this.baseUrl = 'http://gateway.marvel.com/v1/public/';
        this.publicKey = process.env.REACT_APP_MARVEL_API_KEY;
        this.privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
    }

    generateMarvelAuthentication() {
        let ts = new Date().getTime();
        let message = CryptoJS.MD5(ts + this.privateKey + this.publicKey);
        let hash = message.toString();
        let marvelAuth = `&ts=${ts}&apikey=${this.publicKeyY}&hash=${hash}`

        return marvelAuth;
    }

//    getCharacters() {
//        return baseAPI.get(`/characters?apikey=${key}`)
//            .then(response => response.data.data.results)
//            .then(heroesList => {
//                let newHeroesList = heroesList.map(hero => new HeroObj(hero))
//                return newHeroesList;
//            });
//    }
//
//    getSingleCharacter(id) {
//        return baseAPI.get(`/characters/${id}?apikey=${key}`)
//            .then(response => response.data.data.results)
//            .then(response => new HeroInfoObj(response[0]))
//            .catch(error => console.log(error));
//    }

    searchCharacters(name) {
        return axios.get(`${this.baseUrl}/characters?name=${name}${this.generateMarvelAuthentication}`)
            .then(response => response.data.data.results)
            //.then(heroesList => {
            //    let newHeroesList = heroesList.map(hero => new HeroObj(hero))
            //    return newHeroesList
            //})
    }
}


export const characterSearches = new CharacterSearches();
