import React from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props{
    activity:Activity| undefined;
    closeForm:()=>void;
}

export default function ActivityForm({activity:selectedActivity,closeForm}:Props){
    
    const initialState=selectedActivity?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    } 

    const[activity,setActivity]=useState(initialState);

    function handleSumbit(){
        console.log(activity);
    }

    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'/>
                <Form.TextArea placeholder='Description'/>
                <Form.Input placeholder='Category'/>
                <Form.Input placeholder='City'/>
                <Form.Input placeholder='Venue'/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='Cencle'/>
            </Form>
        </Segment>
    );
}