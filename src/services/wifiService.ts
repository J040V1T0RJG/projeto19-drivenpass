import Cryptr from "cryptr";
import dotenv from "dotenv";

import { WifiType } from "../types/wifiTypes";
import * as wifiRepository from "../repositores/wifiRepository";

dotenv.config();

const createWifi = async (wifiData: WifiType) => {
    const { password } = wifiData;
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);

    const encryptedPassword = cryptr.encrypt(password);
    wifiData.password = encryptedPassword;

    await wifiRepository.createWifi(wifiData);
};

const getWifi = async () => {

};

const deleteWifi = async () => {

};

export {
    createWifi,
    getWifi,
    deleteWifi
};