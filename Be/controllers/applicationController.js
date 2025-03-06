import bcrypt from "bcrypt";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { io } from "../socket/socket.js";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DAINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});
//
import UserModel from "../models/UserModel.js";
import CarModel from "../models/CarModel.js";
import ApplicationModel from "../models/ApplicationModel.js";

const ApplicationController = {
    //Đăng ký làm provider
    registerProvider: async (req, res) => {
        try {
            const { id } = req.params;
            const findApplicationExist = await ApplicationModel.findOne({
                userId: id,
            });
            if (findApplicationExist) throw new Error("Bạn đã hỏi đăng ký làm người bán rồi");
            const application = await ApplicationModel.create({
                userId: id,
            });
            io.to("admin-room").emit("register-provider", {
                message: `Có người đăng ký làm provider`,
            });
            res.status(200).send({
                message: "Gửi thành công, chờ được phê duyệt",
                data: application,
            });
            } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
}

export default ApplicationController;