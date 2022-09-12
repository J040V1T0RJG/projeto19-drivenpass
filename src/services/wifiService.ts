import Cryptr from "cryptr";
import dotenv from "dotenv";

import { WifiType } from "../types/wifiTypes";
import * as wifiRepository from "../repositores/wifiRepository";
import { validateToken } from "../utils/validateToken";

dotenv.config();

const createWifi = async (wifiData: WifiType) => {
    const { password } = wifiData;
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);

    const encryptedPassword = cryptr.encrypt(password);
    wifiData.password = encryptedPassword;

    await wifiRepository.createWifi(wifiData);
};

const getWifi = async (wifiId: number | undefined, authorization: string | undefined) => {
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const {id: userId} = await validateToken(authorization);

    let wifi: any[];

    if (wifiId) {
        wifi = await wifiRepository.getwifiById(userId, wifiId);
        if (wifi.length === 0) {
            throw { code: "NotFound", message: "Wifi não existente e/ou pertencente a outro usuario" }
        };
    } else {
        wifi = await wifiRepository.getWifi(userId);
    };

    wifi.map((wi: any , index: number) => {
        const descryptedPassword = cryptr.decrypt(wi.password);
        wifi[index].password = descryptedPassword;
    });

    return wifi;
};

const deleteWifi = async (wifiId: number, authorization: string | undefined) => {
    const {id: userId} = await validateToken(authorization);

    const { count } = await wifiRepository.deleteWifiById(userId, wifiId);

    if (count === 0) {
        throw { code: "NotFound", message: "Wifi não existente e/ou pertencente a outro usuario" }
    };
};

export {
    createWifi,
    getWifi,
    deleteWifi
};