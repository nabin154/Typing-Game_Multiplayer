

const successResponse =(status , message , data)=>{
return {
    status : status,
    message: message,
    data : data,
}
};
const failedResponse =( message)=>{
return {
    status : "failed",
    message: message,

}
};


module.exports = {successResponse , failedResponse};