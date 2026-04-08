import "dotenv/config";
import { app } from "./src/app.js";
import {connect} from "./src/config/db.js";

connect();



const port = process.env.PORT||3001;

app.listen(port,()=>{
    console.log(`App listening on port${port}`);
    
})