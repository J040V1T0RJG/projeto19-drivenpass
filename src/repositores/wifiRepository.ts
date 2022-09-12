import { prisma } from "../config/database";
import { WifiType } from "../types/wifiTypes";

const createWifi = async (wifi: WifiType) => {
    await prisma.wifi.create({data: wifi});
};

export {
    createWifi
};