import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props{
    activity:Activity| undefined;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
}

export default function ActivityForm({activity:selectedActivity,closeForm,createOrEdit}:Props){
    
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
        createOrEdit(activity);
    }

    function handleImputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        const{name,value}=event.target;
        setActivity({...activity,[name]:value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSumbit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleImputChange}/>
                <Form.TextArea placeholder='Description'value={activity.description} name='description' onChange={handleImputChange}/>
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handleImputChange}/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={handleImputChange}/>
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handleImputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='Cencle'/>
            </Form>
        </Segment>
    );
}