import * as Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel } from '../User/model';
import { IAuthService } from './interface';
var validarcpf = require('validar-cpf');

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */

    //  Função que cria o usuario e guarda no banco.
    async createUser(body: IUserModel): Promise<IUserModel> {
        try {
            //Verifica se o json enviado é valido de acordo com o modelo IUserModel
            const validate: Joi.ValidationResult<IUserModel> = AuthValidation.createUser(body);

            //Caso dê erro na validação
            if (validate.error) {
                throw new Error(validate.error.message); 
            }

            //Alimentando o modelo para gravar no banco
            const user: IUserModel = new UserModel({
                name: body.name,
                email: body.email,
                password: body.password,
                documents: [{
                    name: "CPF",
                    value: body.cpf
                }],
                permission: [{
                    name : "Administração Geral",
                    acess : false,
                    userType : 0,
                    register : false,
                    edit : false,
                    delet : false,
                    view : false
                },{
                    name : "Transporte Universitario",
                    acess : false,
                    userType : 0,
                    register : false,
                    edit : false,
                    delet : false,
                    view : false
                },{
                    name : "Configurações do Sistema",
                    acess : false,
                    userType : 0,
                    register : false,
                    edit : false,
                    delet : false,
                    view : false
                }]
            });

            //Verifica se o email ja esta na base de dados
            const query: IUserModel = await UserModel.findOne({
                email: body.email
            });
            //Caso já esteja cadastrado
            if (query) {
                throw new Error('Email já cadastrado em nossa base de dados!');
            }

            //Verifica se o cpf ja esta cadastrado na base de dados
            const cpf: IUserModel = await UserModel.findOne({
                documents: [{
                    name: "CPF",
                    value: body.cpf
                }],
            });
            
            //Caso ja esteja cadastrado!
            if (cpf) {
                throw new Error('CPF ja existe!');
            }
            //Verifica a veracidade do cpf
            if (body.cpf == "11111111111" || body.cpf == "22222222222" ||
                body.cpf == "33333333333" || body.cpf == "44444444444" ||
                body.cpf == "55555555555" || body.cpf == "66666666666" ||
                body.cpf == "77777777777" || body.cpf == "88888888888" ||
                body.cpf == "99999999999" || body.cpf == "00000000000") {
                    
                throw new Error('O CPF informado é invalido.');
            }

            //utiliza uma API externa pra verificar se o cpf é valido.
            if (validarcpf(body.cpf) == false) {
                throw new Error('O CPF informado é invalido.');
            }

            //Salva o usuario no banco de dados
            const saved: IUserModel = await user.save();

            return saved;

        } catch (error) {
            throw new Error(error);
        }
    },

    /**
     * @param {IUserModel} body 
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async login(body: IUserModel): Promise < IUserModel > {
        
        try {
            // Validando corpo da requisição
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.login(body);

            // Se ouver erro na validação
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            // Busca o usuário a partir do e-mail
            const user: IUserModel = await UserModel.findOne({
                email: body.email
            });

            // Caso o e-mail não esteja casastrado 
            if(!user) {
                throw new Error('E-mail/Senha inválido(s)');
            }
            
            // Compara a senha que foi passada no corpo da requisição com a que está no banco
            const isMatched: boolean = await user.comparePassword(body.password);
 
            // Se as senhas forem iguais retorna o usuario
            if (isMatched) {
                return user;
            }

            // Caso a senha esteja errada
            throw new Error('E-mail/Senha inválido(s)');
            
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default AuthService;
