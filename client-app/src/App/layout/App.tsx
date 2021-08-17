import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashbord/ActivityDashboard';

function App() {

  const [activities, setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity| undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=>{
      setActivities(response.data);
    })
  },[])//dodaj []kako bih se izvršilo samo jednom kada se upali api 

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleCancleSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id ? handleSelectActivity(id) : handleCancleSelectedActivity();
    setEditMode(true);
  }  

  function handleFormClose(){
    setEditMode(false);
  }
  
  return (
    < >
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
       <ActivityDashboard 
       activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancleSelectActivity={handleCancleSelectedActivity}
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       />
      </Container>
    </>
  );
}

export default App;
