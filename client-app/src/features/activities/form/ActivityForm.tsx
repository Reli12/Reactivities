import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";



export default observer (function ActivityForm(){
    
    const history=useHistory();
    const {activityStore}=useStore();
    const{
        createActivity,
        updateActivity,loading,
        loadActivitye,loadingInitial
    }=activityStore;

    const {id}=useParams<{id:string}>();

    const[activity,setActivity]=useState({ 
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });

    //onli run this metod if id or loadActtivitye is changed
    useEffect(() => {
       if(id) loadActivitye(id).then(activity=>setActivity(activity!))
    }, [id,loadActivitye]);

    function handleSumbit(){
        if(activity.id.length===0){
            let newActivity={
                ...activity,
                id:uuid()
            };
            createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
        }else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
        }
    }

    function handleImputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        const{name,value}=event.target;
        setActivity({...activity,[name]:value});
    }

    if(loadingInitial)return <LoadingComponent content='Loading activity...'/>

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
                <Button as={Link} to='/activities' floated='right'  type='button' content='Cencle'/>
            </Form>
        </Segment>
    );
})