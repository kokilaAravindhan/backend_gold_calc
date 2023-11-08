import express from 'express';

import { AppUserModel } from '../db-utils/model.js';

import { v4 } from 'uuid';


const authrouter=express.Router();

authrouter.post('/register',async (req,res)=> {
    try{
        const bodyReq=req.body;
        //checking the user email exist or not
        const appUser=await AppUserModel.findOne({email:bodyReq.email},{id:1,name:1,email:1 });
        if(appUser){
            res.status(409).send({ msg: 'User already exist'});
            return;
        }
        //encrypt/hashing the password stored in db
        //await bcrypt.hash(bodyReq.password,10,async(err,hash)=>{
          //  if(err){
            //    res.status(500).send({ msg: 'Error in Registering'});
              //  return;
            //}
            //const authUSer=AppUserModel({...bodyReq,password:hash,id:v4() });
            //await authUSer.save();
        //});
        const authUSer=AppUserModel({...bodyReq,id:v4() });
        await authUSer.save();
        res.send({ msg: 'User Registered Successfully' });
    }catch(err){
        console.log(`error in db registration ${err}`);
        res.status(500).send({ msg: 'Error in creating'});
    }
})

authrouter.get('/:email',async (req,res)=> {
    try{
        const email=req.params.email;
        const appUser=await AppUserModel.findOne({email},{id:1,name:1,email:1 });
        res.send(appUser);
    }catch(err){
        console.log(`error in db registration ${err}`);
        res.status(500).send({ msg: 'Error in creating'});
    }
})

//Login

authrouter.post('/login', async function (req, res) {
    try {
  
      const bodyReq = req.body;
      const appUser = await AppUserModel.findOne({ email: bodyReq.email }, { id: 1, name: 1, email: 1,password: 1, _id: 0 });
      
      if(appUser){
            if(bodyReq.password == appUser.password){

                const responseObj=appUser.toObject();
                delete responseObj.password;
                res.send(responseObj);
            }else{
                
                res.status(401).send({ msg: 'Invalid credentials'});
                return;
            }
      }else{
        res.status(404).send({ msg: 'User Not Found'});
      }
      
    }catch(err){
        console.log(`error in db registration ${err}`);
        res.status(500).send({ msg: 'Error in creating'});
    }

})
export default authrouter;