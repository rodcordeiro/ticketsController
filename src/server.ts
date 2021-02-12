import app from "./App";

app.listen(process.env.PORT, ()=>{
    console.log(`App listening at http://127.0.0.1:${process.env.PORT}`)
});
