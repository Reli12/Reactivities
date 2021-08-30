import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";



export default observer (function ActivityForm(){
    
    const {activityStore}=useStore();
    const{selectedActivity,closeForm,createActivity,updateActivity,loading}=activityStore;

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
        activity.id?updateActivity(activity):createActivity(activity);
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
                <Form.Input type='date' placeholder='Date'value={activity.date} name='date' onChange={handleImputChange}/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={handleImputChange}/>
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handleImputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='Cencle'/>
            </Form>
        </Segment>
    );
})