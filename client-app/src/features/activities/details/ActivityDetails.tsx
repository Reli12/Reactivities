import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card,Image } from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";



export default observer(function ActivityDetails()
{
    const {activityStore}=useStore();
    const {selectedActivity:activity,loadActivitye,loadingInitial}=activityStore;
    const {id}=useParams<{id:string}>();

    useEffect(()=>{
        if(id)loadActivitye(id);      
    },[id,loadActivitye]);

    if(loadingInitial||!activity)return<LoadingComponent content='Loading app '/>;

    return (
        <Card fluid>
                <Image  src={`/assets/categoryImages/${activity.category}.jpg`} />
                <Card.Content>
                        <Card.Header>{activity.title}</Card.Header>
                        <Card.Meta>
                            <span >{activity.date}</span>
                        </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button 
                             as={Link} to={`/manage/${activity.id}`}
                             basic color='blue' content='Edit'
                         />
                        <Button 
                         as={Link} to='/activities'
                         basic color='grey' content='Cencle'
                         />
                    </Button.Group>
                </Card.Content>
        </Card>
    );
});