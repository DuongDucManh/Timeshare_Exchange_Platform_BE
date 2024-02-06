const express = require('express');
const PostController = require('../../models/timeshares');
const exphbs  = require('express-handlebars');
const UserId = require('./user.controller.js');
const {postServices} = require('../../services/v2');
const app = express();
const fs = require('fs');
const path = require('path');


const {StatusCodes} = require('http-status-codes');
const postService = require('../../services/v2/post.service');

class Timeshares {

    async GetAllPosts(req, res, next) {
        try {
            const timeshareList = await postServices.GetAllPosts();
            res.status(StatusCodes.OK).json({
                status: {
                    code: res.statusCode,
                    message: 'Timeshare found'
                },
                data: timeshareList
            })
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({status: {
                code: res.statusCode,
                message: 'Timeshare not found'
            },
            data: timeshareList})
        }
    };

    async GetTimeshareByCurrentOwner(req, res, next) {
        const {current_owner} = req.params;
        const timeshareData = await postServices.GetTimeshareByCurrentOwner(current_owner);
        if (timeshareData) {
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Timeshare found'
            },
            data: timeshareData})
            return;
        }
        res.status(StatusCodes.NO_CONTENT).json({
            status: {
            code: res.statusCode,
            message: 'Timeshare not found'
        },
        data: timeshareData})
    };

    async DeleteTimeshare(req, res, next) {
        try {
            const deleteTimeshare = await postServices.DeleteTimeshare(req);
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Deleted'
            },
            data: deleteTimeshare})
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Delete failed'
            },
            data: deleteTimeshare})
        }
    };

    async UpdateTimeshare(req, res, next) {
        try {
            const updateTimeshare = await postServices.UpdateTimeshare(req);
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Updated'
            },
            data: updateTimeshare})
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Update Failed'
            },
            data: updateTimeshare})
        }
    };

    async RestoreTimeshare(req, res, next) {
        try {
            const restoreTimeshare = await postServices.RestoreTimeshare(req);
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Restored'
            },
            data: restoreTimeshare})
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Restore failed'
            },
            data: restoreTimeshare})
        }
    };

    async ForceDeleteTimeshare(req, res, next) {
        try {
            const forceDeleteTimeshare = await timeshareServices.ForceDeleteTimeshare(req);
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Force Deleted Successful'
            },
            data: forceDeleteTimeshare})
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Force failed'
            },
            data: forceDeleteTimeshare})
        }
    };

    async GetTimeShareByTrash(req, res, next) {
        try {
            const trashList = await timeshareServices.GetTimeShareByTrash();
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Trash list found'
            },
            data: trashList})
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Trash list not found'
            },
            data: trashList})
        }
    };

    async GetTimeshareById(req, res, next) {
        const { id } = req.params;
        try {
            const getTimeshareById = await postServices.GetTimeshareById(id);
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Timeshare id found'
            },
            data: getTimeshareById})
        } catch {
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Id not found'
            },
            data: getTimeshareById})
        }
    };

    async PostTimeshare(req, res, next) {
        res.render('timeshare/home.hbs')
    };

    async UploadPost (req, res) {
        
        try {
            const uploadedFiles = req.files;       
            const images = [];       
            for (const uploadedFile of uploadedFiles) {          
            const fileNameWithoutExtension = path.parse(uploadedFile.filename).name;      
            const newFileName = fileNameWithoutExtension + '.png';    
            const newFilePath = path.join(uploadedFile.destination, newFileName);
                fs.renameSync(uploadedFile.path, newFilePath);
        
                    images.push({ path: newFileName });
            }
        
            const { current_owner, resortId, unitId, price, start_date, end_date } = req.body;
            const uploadedFileInfo = await postService.UploadPost(
                req,
                resortId,
                unitId,
                current_owner,
                price,
                start_date,
                end_date,
                images
            );
        
            console.log('Uploaded files information:', uploadedFileInfo);
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Uploaded successful'
            },
            data: uploadedFileInfo});
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Upload failed'
            },
            data: uploadedFileInfo});
        }
            
    };

    async SubmitRentRequest(req, res) {
        try {
            const { name, phone, email, userId, postId, requestId, status, verificationCode } = req.body;
            const submitRentRequest = await postServices.SubmitRentRequest(
                name,
                phone,
                email,
                userId,
                postId,
                requestId,
                status,
                verificationCode,
            );
            res.status(StatusCodes.OK).json({
                status: {
                code: res.statusCode,
                message: 'Submited Successful'
            },
            data: submitRentRequest});
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.NO_CONTENT).json({
                status: {
                code: res.statusCode,
                message: 'Submit Failed'
            },
            data: submitRentRequest});
        }
    };
}
module.exports = new Timeshares;