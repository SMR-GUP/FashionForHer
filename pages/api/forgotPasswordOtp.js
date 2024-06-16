import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dbConnect from '../../mongoose';



export default async function handler(req, res) {

  if (req.method === 'POST') {
    const connection = await dbConnect();

    const { email, password } = req.body;
    
    const user=await connection.connection.db.collection('users').findOne({email:email})
    if(!user)
        {
            return res.status(400).json({message:'User does not exist'});
            
        }
    const otp = crypto.randomInt(100000, 999999).toString();
    //store otp vs email in database
    try{

      await connection.connection.db.collection('otpStore').deleteMany({email:email})
      await connection.connection.db.collection('otpStore').insertOne({email,otp,createdAt: new Date()});

      res.status(200).json({ message: 'OTP generated and stored successfully.' });

    }

    catch(error){
          console.log("Errror",error);
          res.status(500).json({message:'Error storing otp in database'})
    }
    
    const pass=process.env.GmailAppPass;
    const mailId=process.env.mail;


    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: mailId,
        pass: pass,
      },
    });

    const mailOptions = {
      from: 'smritigupta1626@gmail.com',
      to: email,
      subject: 'Verify your email',
      text: `Your OTP is: ${otp}`,
    };

    try {
        // Send mail
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Verification email sent' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
      }
    } else {
      res.status(405).send({ error: 'Method not allowed' });
    }
}
