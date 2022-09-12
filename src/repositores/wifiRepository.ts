import { prisma } from "../config/database";
import { WifiType } from "../types/wifiTypes";

const createWifi = async (wifi: WifiType) => {
    await prisma.wifi.create({data: wifi});
};

const getWifi = async (userId: number) => {
    return await prisma.wifi.findMany({where: {userId}});
};

const getwifiById = async (userId: number, wifiId: number) => {
    return await prisma.wifi.findMany({
        where: {
            AND: [
                {userId}, {id: wifiId}
            ]}
    });
};

const deleteWifiById = async (userId: number, wifiId: number) => {
    return await prisma.wifi.deleteMany({
        where: {
            AND: [
                {userId}, {id: wifiId}
            ]}
    });
};

export {
    createWifi,
    getWifi,
    getwifiById,
    deleteWifiById
};