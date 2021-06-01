//instance from express framework
const express = require('express');
//call the express function 
const app = express();
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:4200'
  }
  app.use(cors({
    origin: '*',
    credentials: true
  }));//call db module from db.js file

const db = require('./db');


// instance from bodyparser wich used to able us use req.body stetment
var bodyParser = require('body-parser')
app.use(bodyParser.json())
// make variable for the port in our case the port we will work with is 3000
const port = 3000;
app.get('/patients', async(req, res)=>{
    // return response to the client
    //200 code referce to request done correctly
    res.status(200).json("Im working ...");
})

// run the server on the port we defined before
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})


// here every one should write his endpoint with this template to make the file organized and easy to read for every one of us
/*
req body is  obj =>
{
    ID : event's ID ,
    title:event's title,
    type : event's type,
    date:event's data,
    start_time:event's start_time,
    end_time:event's end_time,
    location:event's location,
    description : event's description
}
url => /API/events/editevent
httpType =>PUT
endpoint description => {
    endpoint get obj from req_body 
    then endpoint take the data  and replace the old_date stored in the data base with the new data comming from the body
}
*/
app.put('/API/events/editevent', async (req, res) => {
     
    //write the nesseary sql stetment\
    console.log(req.body.title);
    console.log(req.body.date);
    console.log(req.body.start_time);
    console.log(req.body.end_time);
    console.log(req.body.location);
    console.log(req.body.description);
    console.log(req.body.type);
    console.log(req.body.ID);
    type_id = 0;
    if(req.body.type == "open") type_id = 1;
    else if (req.body.type == "paid") type_id = 2;
    else if(req.body.type == "private") type_id =3;
    let sql = "update event set Title = ?,Date = ?,start_time =?,end_time=?,location=?,description=?,Type_ID=? where ID = ?"
    let [result, rows] = await db.connection.execute(sql, [req.body.title,
        req.body.date, req.body.start_time, req.body.end_time,
        req.body.location, req.body.description, type_id,
        req.body.ID])
     res.status(200).json("row edited");
 });
  /*
url => /API/events/Show_all
httpType =>GET
endpoint description => {
    endpoint executes the select command from the database connection (select event table), then takes the selected columns (title, date)
    from the event table and outputs them onto the screen
}
*/
app.get('/API/events/Show_all/:id', async (req, res) => {
    var id = req.params.id;

    let sql = "SELECT  ID,Title, Date,start_time,end_time FROM event where User_ID = ? ";
    let results =  await db.connection.execute(sql,[id])
    res.status(200).json(results[0]);
});



app.get('/API/events/search/:word', async (req, res) => {
    var id = req.params.word;
    var word =  id + "%" ;
    let sql = "SELECT  * FROM event where Title like ? ";
    let results =  await db.connection.execute(sql,[word])
    res.status(200).json(results[0]);
});



app.get("/API/events/get_event/:id", async (req, res) => {
    var id = req.params.id;
    console.log(id)
    let sql = "select * from event  where ID = ?";
    let results = await db.connection.execute(sql, [id])
    console.log(results[0])
    res.status(200).json(results[0]);
});

app.delete('/API/events/deleteevent/:id', async (req, res) => {
    console.log("hi");
    let sql = "delete from event where ID = ?"
    console.log(req.params.id);

    let [result,rows] = await db.connection.execute(sql , [req.params.id])
    res.status(200).json("Event Successfully Deleted.");
 });

 app.post('/API/events/addevent', async (req, res) => {
    //write the nesseary sql stetment
    let sql = "insert into  event (Title,Date,start_time,end_time,location,description,Type_ID,User_ID) values(?,?,?,?,?,?,?,?);"
   let [result,rows] = await db.connection.execute(sql, [req.body.title, req.body.date, req.body.start_time, req.body.end_time, req.body.location, req.body.description, req.body.type, req.body.userid])
     res.status(200).json("Event Successfully create ");
 });

 app.get('/API/events/attended_events/:id', async (req, res) => {
    var id = req.params.id;
    let sql = "SELECT ID,Title, Date,start_time,end_time FROM event WHERE ID IN (SELECT Event_ID FROM attendees WHERE User_ID = ?)";
    let results =  await db.connection.execute(sql,[id])
    res.status(200).json(results[0]);
});

//external API Get ALL Users   
/*
Just Call localhost:300/API/Users
and the data from the External API get to your Hand :P
*/
 app.get('/API/Users', async (req, res) => {
    var axios = require("axios").default;
    var options = {
       method: 'GET',
       url: 'https://dev-3kr-4o27.us.auth0.com/api/v2/users',
     headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkViWnkwa3VGMVpjUWEtMXZXaXZLYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0za3ItNG8yNy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXBYeVlaRHBMSEo3cjRablh2VHFJNUgweWhRS3RXa3pAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTNrci00bzI3LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjIyMzE3MTQzLCJleHAiOjE2MjI0MDM1NDMsImF6cCI6ImFwWHlZWkRwTEhKN3I0Wm5YdlRxSTVIMHloUUt0V2t6Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.jBMriJ2EXRIKFnt0W6hlTiZq8AMVvGffaG613BQZfSCEhv1c1GT6a3TF3pCpgYPGfn33Np8Y4ZyAKl1VleOfnwbJ3Yk7EQs3I7AR8jxgxOHCHysvx83tdxxks1O9UOB7sQSPOufMDSIJxfLP2tbDFAEJocZm_f2v1VdYoO1sE_LLmkGxu2NElVErt2ky5dEI1B3ie76xqPDe7Vwhv_5bRblOwRqonpFXqqhj1Yr_VFO2nwgDcQTGN-KRdKo8fEmtCXKXTMCNCN2bfb8SkQkjF9_XoHe-f9M7L8_RDAvSp6FUxwNRQhfyN6C6Q9eVuHgsIT1YklzDOJFu_qa70VCYBA' } };
     axios.request(options).then(function (response) {
         res.json(response.data);
     }).catch(function (error) {
       console.error(error);
     });
 });

 app.delete('/API/Users/:id', async (req, res) => {
    var axios = require("axios").default;
    var options = {
       method: 'DELETE',
       url: 'https://dev-3kr-4o27.us.auth0.com/api/v2/users/'+req.params.id,
     headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkViWnkwa3VGMVpjUWEtMXZXaXZLYiJ9.eyJpc3MiOiJodHRwczovL2Rldi0za3ItNG8yNy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXBYeVlaRHBMSEo3cjRablh2VHFJNUgweWhRS3RXa3pAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTNrci00bzI3LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjIyMzE3MTQzLCJleHAiOjE2MjI0MDM1NDMsImF6cCI6ImFwWHlZWkRwTEhKN3I0Wm5YdlRxSTVIMHloUUt0V2t6Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.jBMriJ2EXRIKFnt0W6hlTiZq8AMVvGffaG613BQZfSCEhv1c1GT6a3TF3pCpgYPGfn33Np8Y4ZyAKl1VleOfnwbJ3Yk7EQs3I7AR8jxgxOHCHysvx83tdxxks1O9UOB7sQSPOufMDSIJxfLP2tbDFAEJocZm_f2v1VdYoO1sE_LLmkGxu2NElVErt2ky5dEI1B3ie76xqPDe7Vwhv_5bRblOwRqonpFXqqhj1Yr_VFO2nwgDcQTGN-KRdKo8fEmtCXKXTMCNCN2bfb8SkQkjF9_XoHe-f9M7L8_RDAvSp6FUxwNRQhfyN6C6Q9eVuHgsIT1YklzDOJFu_qa70VCYBA' } };
     axios.request(options).then(function (response) {
         console.log(response.data)
     }).catch(function (error) {
       console.error(error);
     });
 });

