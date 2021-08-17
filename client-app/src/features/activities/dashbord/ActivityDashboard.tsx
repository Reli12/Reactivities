import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities:Activity[];
    selectedActivity:Activity|undefined;
    selectActivity:(id:string)=>void;
    cancleSelectActivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
}

//using destructuring for this is good 
export default function ActivityDashboard(
    {   activities,selectActivity,
        selectedActivity,cancleSelectActivity,
        editMode,openForm,closeForm
    }:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
              <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity&&!editMode&&
                <ActivityDetails 
                    activity={selectedActivity}
                    cancleSelectActivity={cancleSelectActivity}
                    openForm={openForm}
                    />}
                {editMode&&
                <ActivityForm closeForm={closeForm} activity={selectedActivity}/>}             
            </Grid.Column>
        </Grid>
    );
}