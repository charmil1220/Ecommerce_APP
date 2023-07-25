import Product from "@/models/Product"
import connectDb from "@/middleware/moongose"

const handler = async  (req, res)=> {
    if(req.method=='POST'){
        for(let i=0;i<req.body.length;i++){
            console.log(req.body)
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])

        
        }
        res.status(200).json({success:"Success" })
    }
    else{
        res.status(400).json({ error:"This method is not allowed" })
    } 
  }

export default connectDb(handler);
  