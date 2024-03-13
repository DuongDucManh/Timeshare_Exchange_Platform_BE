const UserModel = require('../../models/users');
const RequestModel = require('../../models/requests');
const PaymentModel = require('../../models/payments');
const ReservationModel = require('../../models/reservations');
const ResortModel = require('../../models/resorts');
const TimeshareModel = require('../../models/timeshares');
const TripModel = require('../../models/trips');
const ExchangeModel = require('../../models/exchanges');
const {StatusCodes} = require('http-status-codes');
const query = require('../../utils/query')

class AdminService {
    //request management
    async getAllRequest(){
        try{
            return RequestModel.find({});
        } catch (error) {
            throw new Error(`Error find request: ${error.message}`);
        }
    }
    async getAllPendingRequests(){
        try{
            return RequestModel.find({ status: 'pending' });
        } catch (error) {
            throw new Error(`Error find pending request: ${error.message}`);
        }
    }
    async confirmARequest(id){
        try {
            return RequestModel.updateOne({ _id: id }, { status: 'confirmed' });
        } catch (error) {
            throw new Error(`Error confirm request: ${error.message}`);
        }
    }
    async cancelRequest(id){
        try {
            return RequestModel.updateOne({ _id: id }, { status: 'canceled' });
        } catch (error) {
            throw new Error(`Error confirm request: ${error.message}`);
        }
    }
    //Account management
    async banAccount(id){
        try {
            return UserModel.updateOne({ _id: id }, {isBanned: true});
        } catch (error) {
            throw new Error(`Error ban account: ${error.message}`);
        }
    }
    async getAllBannedAccount(){
        try {
            return UserModel.find({isBanned: true, isDeleted: false});
        } catch (error) {
            throw new Error(`Error show ban account: ${error.message}`);
        }
    }
    async unbanAccount(id){
        try {
            return UserModel.updateOne({ _id: id }, {isBanned: false});
        } catch (error) {
            throw new Error(`Error unban account: ${error.message}`);
        }
    }
    async softDeleteAccount(id) {
        try {
            return UserModel.updateOne({_id: id}, {isDeleted: true});
        } catch (error) {
            console.error('Error soft deleting user:', error);
        }
    }
    async forceDeleteAccount(id){
        try {
            return UserModel.deleteOne({_id: id});
            
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    async getDeletedAccount(){
        try {
            return UserModel.find({isDeleted: true});

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }  
    async restoreAccount(id){
        try {
            return UserModel.updateOne({_id: id}, { isDeleted: false });
        } catch (error) {
            console.error('Error restore user:', error);
        }
    }
    async getAllAccount(){
        try{
            return UserModel.find({isDeleted: false, isBanned: false});
        }catch(err){
            throw new Error(`Error in get account: ${error.message}`);
        }
    }
    async getAllRequestByUserId(id){
        try{
            return RequestModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get RequestModel by user id: ${error.message}`);
        }
    }
    async getAllPaymentByUserId(id){
        try{
            return PaymentModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get PaymentModel by user id: ${error.message}`);
        }
    }
    async getAllReservationByUserId(id){
        try{
            return ReservationModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get ReservationModel by user id: ${error.message}`);
        }
    }
    async getAllResortByUserId(id){
        try{
            return ResortModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get ResortModel by user id: ${error.message}`);
        }
    }
    async getAllTimeshareByUserId(id){
        try{
            return TimeshareModel.find({current_owner: id});
        } catch (error) {
            throw new Error(`Error get TimeshareModel by user id: ${error.message}`);
        }
    }
    async getAllTripByUserId(id){
        try{
            return TripModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get TripModel by user id: ${error.message}`);
        }
    }
    async getPersonalAccountDetail(id){
        try{
            return UserModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get UserModel by user id: ${error.message}`);
        }
    }
    async getAllExchangeByUserId(id){
        try{
            return ExchangeModel.find({userId: id});
        } catch (error) {
            throw new Error(`Error get UserModel by user id: ${error.message}`);
        }
    }
    async getAccountDetailsById(id){
        const requests = await this.getAllRequestByUserId(id);
        const payments = await this.getAllPaymentByUserId(id);
        const reservations = await this.getAllReservationByUserId(id);
        const timeshares = await this.getAllTimeshareByUserId(id);
        const trips = await this.getAllTripByUserId(id);
        const personalDetail = await this.getPersonalAccountDetail(id);
        const exchanges = await this.getAllExchangeByUserId(id);

        console.log(exchanges);
        return {
            requests,
            reservations,
            timeshares,
            trips,
            personalDetail,
            exchanges,
            payments
        };
    }

    //report-balance
    async getAllPostInAMonth(){
        
    }
    async getAnnualIncome(){

    }

    // async getAllUserAccount(){
    //     return UserModel.find({ role: user }, {isDeleted: false});
    // }
    // async getAllMemberAccount(){
    //     return UserModel.find({ role: member }, {isDeleted: false});
    // }
    // async getNotAdminAccount(){
    //     return UserModel.find({ role : { $ne:'admin' } }, {isDeleted: false});
    // }

    //Payment management
    async getAllPayment(){
        try{
            return PaymentModel.find({});
        }catch(error){
            console.log("error in get payment" + error);
        }
    }
    //Resort management
    async banResort(id){
        try {
            return ResortModel.updateOne({ _id: id }, {isBanned: true});
        } catch (error) {
            throw new Error(`Error ban ResortModel: ${error.message}`);
        }
    }
    async getAllBannedResort(){
        try {
            return ResortModel.find({isBanned: true, isDeleted: false});
        } catch (error) {
            throw new Error(`Error show ban ResortModel: ${error.message}`);
        }
    }
    async unbanResort(id){
        try {
            return ResortModel.updateOne({ _id: id }, {isBanned: false});
        } catch (error) {
            throw new Error(`Error unban ResortModel: ${error.message}`);
        }
    }
    async softDeleteResort(id) {
        try {
            return ResortModel.updateOne({_id: id}, {isDeleted: true});
        } catch (error) {
            console.error('Error soft deleting ResortModel:', error);
        }
    }
    async forceDeleteResort(id){
        try {
            return ResortModel.deleteOne({_id: id});
            
        } catch (error) {
            console.error('Error deleting ResortModel:', error);
        }
    }
    async getDeletedResort(){
        try {
            return ResortModel.find({isDeleted: true});

        } catch (error) {
            console.error('Error deleted ResortModel:', error);
        }
    }  
    async restoreResort(id){
        try {
            return ResortModel.updateOne({_id: id}, { isDeleted: false });
        } catch (error) {
            console.error('Error restore ResortModel:', error);
        }
    }
    
}

module.exports = new AdminService;
