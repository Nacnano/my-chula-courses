const Hospital=require('../models/Hospital');

exports.getHospitals=async (req,res,next)=>{
    let query;

    //Copy req.query
    const reqQuery={...req.query};

    //Fields to exclude
    const removeFields=['select','sort','page','limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    let queryStr=JSON.stringify(reqQuery);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);
    console.log(queryStr);
    query=Hospital.find(JSON.parse(queryStr)).populate('appointments');

    //Select Fields
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
    }
    //Sort
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    } else{
        query=query.sort('-createdAt');
    }

    try {

        //Pagination
        const page=parseInt(req.query.page,10)||1;
        const limit=parseInt(req.query.limit,10)||25;
        const startIndex=(page-1)*limit;
        const endIndex=page*limit;
        const total=await Hospital.countDocuments();

        query=query.skip(startIndex).limit(limit);

        const hospitals = await query;

        //Pagination Result
        const pagination={};

        if(endIndex<total){
            pagination.next={page:page+1,limit}
        }

        if(startIndex>0){
            pagination.prev={page:page-1,limit}
        }        

        res.status(200).json({success:true, count:hospitals.length, pagination, data:hospitals});
        
    } catch (error) {
        res.status(400).json({success:false});        
    }
}

exports.getHospital=async (req,res,next)=>{
    try {
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:hospital});
        
    } catch (error) {
        res.status(400).json({success:false});        
    }
}

exports.createHospital=async (req,res,next)=>{
    const hospital = await Hospital.create(req.body);
    res.status(200).json({success:true, data:hospital});
}

exports.updateHospital=async (req,res,next)=>{
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id,
            req.body,{
                new:true,
                runValidators:true
            });

        if(!hospital){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:hospital});
        
    } catch (error) {
        res.status(400).json({success:false});        
    }
}

exports.deleteHospital= async (req,res,next)=>{
    try {
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false});
        }
        await hospital.deleteOne();
        res.status(200).json({success:true, data:{}});
        
    } catch (error) {
        res.status(400).json({success:false});        
    }
}