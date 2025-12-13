const fs=require('fs');
const path=require('path');
exports.handler=async()=>{
  try{const file=path.join(__dirname,'..','..','private','-nursing.html');
      const html=fs.readFileSync(file,'utf8');
      return{statusCode:200,headers:{'Content-Type':'text/html; charset=utf-8'},body:html};
  }catch(err){return{statusCode:500,body:`Error loading  page: ${err.message}`}}}
// bump 1756148842
// bump 1756148950
// bump 12422
// bump 17445
