import React, {useEffect } from 'react';
import {Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashbord/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore}=useStore();
  
  useEffect(()=>{
   activityStore.loadActivity();
  },[activityStore])//dodaj []kako bih se izvršilo samo jednom kada se upali api 

if (activityStore.loadingInitial) return <LoadingComponent content='Loading app '/>


  return (
    < >
      <NavBar />
      <Container style={{marginTop:'7em'}}>
       <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
