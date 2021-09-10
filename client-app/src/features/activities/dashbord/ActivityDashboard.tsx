import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
//import ActivityDetails from "../details/ActivityDetails";
//import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

//using destructuring for this is good 
export default observer(function ActivityDashboard(){

    const {activityStore}=useStore();
    const {loadActivity,activityRegistry}=activityStore;
   // const {selectedActivity,editMode}=activityStore;

    useEffect(()=>{
     if(activityRegistry.size<=1) loadActivity();
    },[activityRegistry.size,loadActivity])
    //dodaj []kako bih se izvršilo samo jednom kada se upali api 
  
  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app '/>

    return(
        <Grid>
            <Grid.Column width='10'>
              <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* {selectedActivity&&!editMode&&
                <ActivityDetails />}
                {editMode&&
                <ActivityForm />}    */} 
                <h2>Filters</h2>   
            </Grid.Column>
        </Grid>
    );
})