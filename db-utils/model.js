import mongoose from "mongoose";


const appUserSchema = new mongoose.Schema({
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true
    }
  });
  
  const AppUserModel = mongoose.model('app-users', appUserSchema);
  
  export { AppUserModel  }