import { Document, Schema } from 'mongoose';
import * as connection from './../../config/connection/connection'

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    name: string;
    cpf: string;
    email: string;
    password: string;
    activeEmail: Object;
    universityTransportation: Object;
    comparePassword: (password: string) => Promise<boolean>;
}

const institutionSchema: Schema = new Schema({

    name: { type: String, require: true, enum: ['UFMS', 'IFMS', 'AEMS', 'FUNEC', 'FEA', 'FIU', 'FIRB', 'UNICESUMAR', 'SENAI', 'UNIVESP'] },
    city: { type: String, require: true, enum: ['TRÊS LAGOAS - MS', 'PEREIRA BARRETO - SP', 'ANDRADINA - SP', 'SANTA FÉ DO SUL - SP'] },
    course: { type: String, require: true },
    startYear: { type: String, require: true },
    yearTermination: { type: String, require: true },
    timeToGo: { type: Array, require: true },
    timeToBack: { type: Array, require: true }
});

const FileReRegisterSchema: Schema = new Schema({

    documentName: { type: String, require: true },
    fileName: { type: String, require: true },
    type: { type: String, require: true },
    uploadDate: { type: Date, require: true }
});

const reRegisterSchema: Schema = new Schema({

    registrationInfo: {
        year: { type: Number, require: true },
        semester: { type: Number, require: true },
    },
    idCardEmissionDate: { type: Date, require: false },
    registrationDate: { type: Date, require: true },
    registrationStatus: {
        status: { type: String, require: true },
        description: { type: String, require: false },
        comments: { type: String, require: false }
    },
    registrationDocuments: [{ type: FileReRegisterSchema }]
})
 const universityTransportationSchema: Schema = new Schema({

    profession: { type: String, require: false, default:'ESTUDANTE' },
    bloodType: { type: String, require: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Não sei informar'] },
    motherSname: { type: String, require: true },
    institution: { type: institutionSchema, require: false },//mudar require depois de testes
    registerStatus: { type: String, require: false },//mudar require depois de testes
    description: { type: String, require: false },
    comments: { type: String, require: false },
    semesterRegistration: [reRegisterSchema]
});




const FileSchema: Schema = new Schema({

    name: { type: String, require: true },
    type: { type: String, require: true },
    uploadDate: { type: Date, require: true }
});

const authEmailSchema: Schema = new Schema({

    verified: { type: Boolean, require: false },
    linkVerification: { type: String, require: true },
    authToken: { type: String, require: true }
});

const docSystemUserSchema: Schema = new Schema({

    name: { type: String, require: true, uppercase: true, enum: ['RG', 'CPF', 'FOTO3X4', 'CADASTRO MUNICIPAL', 'COMPROVANTE DE MATRÍCULA', 'COMPROVANTE DE RESIDÊNCIA'] },
    value: { type: String, require: true },
    expeditionDate: { type: String, require: false }, // data expedição transporte rg
    state: { type: String, require: false },
    file: { type: FileSchema, require: false }

});

const userPermission: Schema = new Schema({
    name: { type: String, require: true },
    acess: { type: Boolean, require: true },
    userType: { type: Number, require: true },
    register: { type: Boolean, require: true },
    edit: { type: Boolean, require: true },
    delet: { type: Boolean, require: true },
    view: { type: Boolean, require: true }
})
const addressSystemUserSchema: Schema = new Schema({

    name: { type: String, require: true, enum: ['RESIDENCIAL', 'COMERCIAL'] },
    street: { type: String, require: false },
    number: { type: String, require: false },
    complement: { type: String, require: false },
    neighborhood: { type: String, require: false },
    city: { type: String, require: false },
    zip_code: { type: String, require: false },
    state: { type: String, require: false }
})

const phoneSystemUserSchema: Schema = new Schema({

    name: { type: String, require: true, enum: ['COMERCIAL', 'RESIDENCIAL', 'CELULAR', 'FIXO-RECADO', 'CELULAR-RECADO'] },
    number_phone: { type: String, require: false }
})

const SystemUser:Schema = new Schema({
    name: {type: String, required: true },
    cpf: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    registrationDate: {type: Date, default: Date.now},
    active: {type: Boolean, required: false, default: true}
});


export default connection.db.model<IUserModel>('systemusers',SystemUser);