

const successResponse =( message , data)=>{
return {
    status : 'success',
    message: message,
    data : data,
}
};
const failedResponse =(message)=>{
return {
    status : "failed",
    message: message,

}
};


module.exports = {successResponse , failedResponse};