import dbConnect from '../../mongoose';


export default async function handler(req, res) {


    if (req.method === 'POST') {
      const { email, otp, password } = req.body;
      console.log(email+" "+otp+" "+password);
      const connection = await dbConnect();
      const entry = await connection.connection.db.collection('otpStore').findOne({email:email});
      //fetch from database;

      console.log("Stored ",typeof(entry.otp));
      console.log("Entered ",typeof(otp));

      if (entry.otp === otp) {
        // OTP matches, complete registration
        // Save user to the database (not shown here)
        const userExist=await connection.connection.db.collection('users').findOne({email:email});
        if(!userExist)
          {
        const user = await connection.connection.db.collection('users').insertOne({
            email,
            password,
            cart:[]
          });

          console.log('User registered:', user);
        }

        else
        {
          console.log("user verified");
          await connection.connection.db.collection('otpStore').deleteMany({email:email})
          return res.status(200).send({message:'User verified'});
        }

          
        await connection.connection.db.collection('otpStore').deleteMany({email:email})
         // Clear OTP after verification from database
        res.status(200).send({ message: 'Registration successful' });
      } else {
        res.status(400).send({ error: 'Invalid OTP' });
      }
    } else {
      res.status(405).send({ error: 'Method not allowed' });
    }
  }