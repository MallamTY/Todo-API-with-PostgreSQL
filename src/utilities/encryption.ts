import bcrypt from 'bcrypt';


export const encrypt = async(password: string, confirm_password: string) => {
    interface hashedInt {
        hashed_password: string,
        hashed_confirmed_password: string
    }
    const salt: string | number =  await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    const hashed_confirmed_password = await bcrypt.hash(confirm_password, salt);

    let hashed: hashedInt = {
        hashed_password,
        hashed_confirmed_password
    }

    return hashed;
    
}
