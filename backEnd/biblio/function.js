exports.success = (data) => {
    return {
        status: 'success',
        result: data
    }
} 

exports.error = (data) => {
    return {
        status: 'error',
        result: data
    }
}

exports.logeur = (data) => {
    console.log(data)
}

exports.isErr = (err) =>{
    return err instanceof Error;
}

exports.checkAndChange = (obj) => {
    if (this.isErr(obj)){
        return this.error(obj.message);
    }else{
        return this.success(obj);
    }
}
