import systemusers from './model';

class SystemUserService {
 get(){
    return systemusers.find();
 }

 getbyId(_id){
    return systemusers.findById(_id);
 }

 create(user){
    return systemusers.create(systemusers);
 }

 update(_id,user ){
    return systemusers.findOneAndUpdate(_id, user);
 }

 delete(_id){
     return systemusers.findByIdAndRemove(_id);
 }
}

export default new SystemUserService();