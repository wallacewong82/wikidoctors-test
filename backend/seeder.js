import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
//import products from './data/products.js';
import User from './models/userModel.js';
// import Product from './models/productModel.js';
// import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
import Specialist from "./models/specialistModel.js";
import specialists from "./data/specialists3.js";
//import Package from "./models/packageModel.js";
//import packages from "./data/packages.js";
import Blog from "./models/blogModel.js";
import blogs from "./data/blogs.js";
import Appointment from "./models/appointmentModel.js";
import appointments from "./data/appointments.js";
//commands: npm run data:import && npm run data:destroy

dotenv.config();
connectDB();

const importData = async()=>{
    try{
       // await Order.deleteMany();
        //await Product.deleteMany();
        await User.deleteMany();
        await Specialist.deleteMany();
      //  await Package.deleteMany();
        await Blog.deleteMany();
        await Appointment.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        // const sampleProducts = products.map((product)=>{
        //     return {...product, user: adminUser};
        // })
        // await Product.insertMany(sampleProducts);
        const sampleSpecialists = specialists.map((specialist)=>{
            return{...specialist};
        })
        await Specialist.insertMany(sampleSpecialists);
        // const samplePackages = packages.map((packageItem)=>{
        //     return{...packageItem};
        // })
        // await Package.insertMany(samplePackages);

        const sampleBlogs = blogs.map((blogItem)=>{
            return {...blogItem};
        })
        await Blog.insertMany(sampleBlogs);

        const sampleAppointments = appointments.map((appointmentItem)=>{
            return{...appointmentItem};
        })
        await Appointment.insertMany(sampleAppointments);

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch(err){
        console.log(`Data entry error + ${err}`);
        process.exit(1);
    }  
}
const destroyData = async ()=>{
    try{
       // await Order.deleteMany();
       // await Product.deleteMany();
        await User.deleteMany();
        await Specialist.deleteMany();
      //  await Package.deleteMany();
        await Blog.deleteMany();
        await Appointment.deleteMany();
        console.log('Data deleted!'.green.inverse);
        process.exit();
    } catch(err){
        console.log(`Data deletion error + ${err}`);
        process.exit(1);
    }
}
if(process.argv[2]==='-d'){
    destroyData();
} else{
    importData();
}