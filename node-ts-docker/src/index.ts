import express from 'express';

const app = express();

app.get('/', async (req, res) => {
    
    try {
    
      const message = { data: "Hello world" };
      
      res.send(message.data);

    } catch (error) {
      console.error(error);
      res.status(500).send('Error request');
    }
  });
  

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});