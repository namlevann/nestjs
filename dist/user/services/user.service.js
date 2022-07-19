"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enum_1 = require("../enum");
const user_schema_1 = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const common_2 = require("../../common");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const { email, userName, password } = createUserDto;
        const user = this.userModel.findOne({ userName });
        if (user) {
            throw new common_1.NotFoundException(`Email ${email} is exist`);
        }
        const hashPassword = await bcrypt.hash(password, common_2.HASH_LENGTH);
        const createdUser = new this.userModel({
            email,
            userName,
            password: hashPassword,
            role: enum_1.ROLE.USER,
        });
        return createdUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async updateAvatar(url, id) {
        const user = this.userModel
            .findByIdAndUpdate(id, {
            avatar: url,
        })
            .setOptions({ overwrite: true, new: true });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async findUser(userName) {
        const currentUser = this.userModel.findOne({ userName });
        if (!currentUser) {
            throw new common_1.NotFoundException(`User ${userName} not found`);
        }
        return currentUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map