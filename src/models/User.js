import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: [
            {
                validator: value =>validator.isStrongPassword(value),
                message: "Password must contain one more alphanumeric character and symbols"
            }
        ]
    },
},
{
    timestamps: true
}
)


userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next() 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
    
}

const User = mongoose.model("User", userSchema);

export default User