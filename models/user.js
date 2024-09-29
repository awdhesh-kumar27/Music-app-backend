    import mongoose from 'mongoose'
    import bcrypt from 'bcrypt'
    var schema = mongoose.Schema;
    var objectId = schema.objectId;
    const userSchema = schema({

        username:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true 
        },
        phonenumber:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }

    });

    userSchema.pre('save',async function(next){
        // if (!this.isModified('password')) return next();

            try {

                const hashedPassword = await bcrypt.hash(this.password, 10);
                this.password = hashedPassword;
                next();
            } catch (err) {
                next(err);
            }
       
    })
    const User = mongoose.model('User',userSchema);

    export default User;
