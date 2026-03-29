import "dotenv/config";
import { app } from "./src/app.js";
import {connect} from "./src/config/db.js";
import { invokeGemeniAi } from "./src/services/ai.services.js";
connect();

invokeGemeniAi();

const port = process.env.PORT||3001;

app.listen(port,()=>{
    console.log(`App listening on port${port}`);
    
})