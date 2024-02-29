const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./MVC/Route/Route');
const courseRoutes = require('./MVC/Route/courseRoute');
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', courseRoutes);

app.use('/', (req,res)=>{
res.send("welcome to machine")
})

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
