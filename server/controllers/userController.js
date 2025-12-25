


// GET /api/user/

export const getUserData = async (req, res)=>{
    try{
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success: true, role, recentSearchedCities})

    } catch (error){
        res.json({success:false, message: error.message})

    }
    
}

// Store User Recent Search Cities
export const storeRecentSearchedcities = async (req, res)=>{
try {
const {recentsearchedcity} = req.body
const user = await req.user;

if(user.recentSearchedcities.length<3){
    user.recentSearchedcities.push(recentsearchedcity)
}else{
    user.recentSearchedCities.shift();
    user.recentSearchedCities.push(recentsearchedcity)
}
await user.save();
res.json({success: true, message: "city added"})

} catch (error) {
    res.json({success: false, message: error.message})
}
}