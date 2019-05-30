import SystemUserService from './service';
import * as httpStatus from 'http-status';
import SendError from './../../config/error/sendError';


class UserController {
   
    get(req, res) {
        SystemUserService.get()
        .then(user => SendError.sendResponse(res,httpStatus.OK,user))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }


    getById(req, res) { 
        const _id = req.params._id

        SystemUserService.getbyId(_id)
        .then(user => SendError.sendResponse(res,httpStatus.OK,user))
        .catch(error => console.error.bind(console,`Error ${error}`));
    }

    create(req, res) { 
        const body = req.body;
        SystemUserService.create(body)
        .then(user => SendError.sendResponse(res,httpStatus.OK,"Usuário Cadastrado com sucesso"))
        .catch(error => console.error.bind(console,`Error ${error}`));
    }

    update(req, res) { 
        const _id = req.params._id;
        const body = req.body;

        SystemUserService.update(_id,body)
        .then(user => SendError.sendResponse(res,httpStatus.OK,`O usuario ${body.name} Atualizado com Sucesso`))
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    delete(req, res) { 
        
        const _id = req.params._id;

        SystemUserService.delete(_id)
        .then(user => SendError.sendResponse(res,httpStatus.OK, `O usuario ${req.body.name} Removido!`))
        .catch(error => console.error.bind(console, `Error ${error}`));
    
    }


}

export default new UserController();