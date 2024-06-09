import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dbConnect from '../../mongoose';



export default async function handler(req, res) {

    console.log("API called");
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(email+"    "+password);
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(otp);
    //store otp vs email in database
    try{
      const connection = await dbConnect();

      await connection.connection.db.collection('otpStore').deleteMany({email:email})
      await connection.connection.db.collection('otpStore').insertOne({email,otp,createdAt: new Date()});

      res.status(200).json({ message: 'OTP generated and stored successfully.' });

    }

    catch(error){
          console.log("Errror",error);
          res.status(500).json({message:'Error storing otp in database'})
    }
    

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: 'smritigupta1626@gmail.com',
        pass: 'zpdp pfjx bimj fcwe'
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
