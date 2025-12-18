// import { json } from "express";
// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkwebhooks = async (req, res) => {
//     try {
//         // Create a Svix instance with clerk webhook secret.
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
//         // Getting Header
//         const header = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         };
//         // Verifying Headers

//         await whook.verify(JSON.stringify(req.body), header)

//         //Getting data from request body
//         const { data, type } = req.body

//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name + "" + data.last_name,
//             image: data.image_url,

//         }
//         //Switch Cases for different Events
//         switch (type) {
//             case "user.created": {
//                 await User.create(userData)
//                 break;
//             }

//             case "user.updated": {
//                 await User.findByIdAndUpdate(data.id, userD);
//                 break;
//             }


//             case "user.deleted": {
//                 await User.findByIdAndUpdate(data.id);
//                 break;
//             }
//             default:
//                 break;

//         }
//         res.json({ success: true, message: "webhook Received" })

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: "error.message" });
//     }

// }

// export default clerkwebhooks;


import User from "../models/User.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
    try {
        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
        
        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Getting data from request body
        const { data, type } = req.body;

        // Prepare user data
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: (data.first_name || "") + " " + (data.last_name || ""),
            image: data.image_url,
        };

        // Switch Cases for different Events
        switch (type) {
            case "user.created": {
                await User.create(userData);
                console.log("User created:", userData._id);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated:", data.id);
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                console.log("User deleted:", data.id);
                break;
            }
            
            default:
                console.log("Unhandled webhook type:", type);
                break;
        }

        res.json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkwebhooks;