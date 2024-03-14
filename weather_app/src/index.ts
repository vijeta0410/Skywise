import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { cors } from 'hono/cors';

type Bindings = {
  auth_token : string;
  DB: D1Database;
}

type Planner = {
  start_date : Date,
  end_date : Date
}

const app = new Hono<{ Bindings:  Bindings }>();

app.use('*', async (c, next) => {

  // CORS middleware configuration
  const corsMiddleware = cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
    allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })

  // Apply CORS middleware to all routes to allow cross-origin requests
  return await corsMiddleware(c, next)
})

app.on('all', '/*', async(c, next) => { // for encrypted token 
  const applyAuth = bearerAuth({
    token : c.env.auth_token,
    });
return applyAuth(c, next);
  })




type weather = {
  climatic_description: string;
  weather_id: number;
};

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.get('/weather_id/:climatic_description', async (c) => {
  const climatic_description = c.req.param('climatic_description');
  const weather_id = await c.env.DB.prepare(`select weather_id from weather where climatic_description = ?`).bind(climatic_description).run();
  return c.json(weather_id); 
});



app.get('/destination/:weather_id', async (c) => {
  const weather_id = c.req.param('weather_id');
  const destination = await c.env.DB.prepare(`select * from destination where weather_id = ?`).bind(weather_id).run();
  return c.json(destination); 
});


app.get('/spots/:destination_id', async (c) => {
  const destination_id = c.req.param('destination_id');
  const spots = await c.env.DB.prepare(`select * from spots where destination_id = ?`).bind(destination_id).run();
  return c.json(spots); 
});


app.get('/destination/bookings/:destination_name', async (c) => {
  const destination_name = c.req.param('destination_name');
  const bookings = await c.env.DB.prepare(`select bookings from destination where destination_name = ?`).bind(destination_name).run();
  return c.json(bookings); 
});

app.get('/plan/get/:id', async (c) =>{
  const id = c.req.param('id');

  const plans = await c.env.DB.prepare(`select * from planner where user_id = ? order by planner_id desc`).bind(id).all();

  return c.json(plans)

})


app.get('/user/get/:username', async (c) =>{
  const username = c.req.param('username');

  const userId = await c.env.DB.prepare(`select user_id from users where username = ?`).bind(username).run();

  return c.json(userId)

})


app.get('/users/details/:username', async (c) =>{
  const username = c.req.param('username');

  const userInfo = await c.env.DB.prepare(`select username, password from users where username = ?`).bind(username).run();

  return c.json(userInfo)

})




app.post('/plan/new', async (c) => {
  try {
    const { user_id, destination_id, destination_name, start_date, end_date } = await c.req.json();
  
    const { success } = await c.env.DB.prepare(
      `INSERT INTO planner (user_id, destination_id, destination_name ,start_date, end_date, created_at, updated_at) VALUES (?,?,?,?,?,?,?);`
    ).bind(user_id, destination_id, destination_name ,start_date, end_date, new Date().toISOString(), new Date().toISOString()).run();
  
    if (success) {
      return c.text('Trip added successfully');
    } else {
      return c.text('Failed to add trip');
    }
  } catch (error) {
    console.error('An error occurred while adding the trip:', error);
    return c.text('Internal Server Error');
  }
});


app.post('/user/new', async (c) => {
  const {username, password, email } = await c.req.json();

  const { success } = await c.env.DB.prepare(
    `INSERT INTO users (username, password, email) VALUES (?,?,?);`
  ).bind( username, password, email ).run();

  if (success) {
    return c.text('User added successfully');
  } else {
    return c.text('Failed to add user');
  }
});







  app.delete('/plan/delete/:id', async (c) => {
    // get the todo id from the request
    const id = c.req.param('id')
  
    // delete the todo by id
    const { success } = await c.env.DB.prepare(`
      DELETE FROM planner WHERE planner_id = ?;
    `).bind(id).run()
  
    // return success message
    if (success) {
      return c.text('Plan deleted')
    } else {
      return c.text(' deletion failed')
    }
})


app.delete('/delete/plan/delete-all', async (c) => {
  const { success } = await c.env.DB.prepare(`
    DELETE FROM planner;
  `).bind().run()

  // return success message
  if (success) {
    return c.text('All plan deleted successfully')
  } else {
    return c.text('Plan deletion failed')
  }
})


// Add this endpoint to your server

// Update planned trip by ID
// Update planned trip by ID
app.put('/plan/update/:id', async (c) => {
  try {
    // Extract the trip ID from the request parameters
    const id = c.req.param('id');
    
    // Extract the new start date and end date from the request body
    const { start_date, end_date } = await c.req.json();

    // Update the planned trip in the database
    const { success } = await c.env.DB.prepare(`
      UPDATE planner
      SET start_date = ?, end_date = ?,updated_at = ?
      WHERE planner_id = ?;
    `).bind(start_date, end_date ,new Date().toISOString(),id).run();

    // Return success message or failure
    if (success) {
      return c.text('Planned trip updated successfully');
    } else {
      return c.text('Failed to update planned trip');
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error('An error occurred during the update:', error);
    return c.text('Update failed');
  }
});



export default app;
