export const login =async(req,res)=>{
    req.session.isAuth=true
    console.log(req.session)
    console.log(req.session.id)

    const {name,email,password}=req.body
    // console.log(req.session)
    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        console.log(e);
    }
}