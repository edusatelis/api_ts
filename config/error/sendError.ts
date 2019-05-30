class SendError{
    sendResponse = (res,statuscode,data) => {
        res.status(statuscode).json({result: data});
    }

}

export default new SendError();