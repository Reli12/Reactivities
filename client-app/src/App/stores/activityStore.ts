import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
   //activities: Activity[]=[];
    activityRegistry=new Map<string,Activity>();
    selectedActivity: Activity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
            Date.parse(a.date)-Date.parse(b.date));
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activitities,activity)=>{
                const date=activity.date;//key for objects
                activitities[date]=activitities[date] ? [...activitities[date], activity]
                 :[activity];
                 return activitities;
            },{} as {[key:string]:Activity[]})
        )
    }

    //if use an arrow function it automaticly bound action to the class

     //this is for evry activity
    loadActivity=async()=>{
        //evry sincronic cod will be in try catch block
        this.setLoadingInitial(true);
        try{
           const activities= await agent.Activities.list(); 
            activities.forEach(activity=>{
               // activity.date=activity.date.split('T')[0];
               // this.activities.push(activity);
               // this.activityRegistry.set(activity.id,activity);
               this.setActivity(activity);
            })
           this.setLoadingInitial(false);
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    //this is for load one activity on page;)
    loadActivitye=async(id:string)=>{//load one activity 
        let activity=this.getActivity(id);
        if(activity){
            this.selectedActivity=activity;
            return activity;
        }else{
            this.loadingInitial=true;
            try {
                activity=await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity=activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity=(activity:Activity)=>{
        activity.date=activity.date.split('T')[0];
        this.activityRegistry.set(activity.id,activity);
    }

    private getActivity=(id:string)=>{
        return this.activityRegistry.get(id);
    }

    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }
   /*
    selectActivity=(id:string)=>{
      //  this.selectedActivity=this.activities.find(a=>a.id===id);
      this.selectedActivity=this.activityRegistry.get(id);
    }

    cancleSelectedActivity=()=>{
        this.selectedActivity=undefined;
    }

    openForm=(id?:string)=>{
        id ? this.selectActivity(id): this.cancleSelectedActivity();
        this.editMode=true;
    }

    closeForm=()=>{
        this.editMode=false;
    }
*/
    createActivity= async(activity:Activity)=>{
        this.loading=true;
        try {
           await agent.Activities.create(activity);
            runInAction(()=>{
              //  this.activities.push(activity);
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
             this.loading=false;
            })
        }
    }

    updateActivity=async(activity:Activity)=>{
        this.loading=true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                //creating new array of activities and saving updated activity
              // this.activities=[ ...this.activities.filter(a=>a.id!== activity.id),activity];
               this.activityRegistry.set(activity.id,activity);
               this.selectedActivity=activity;
               this.editMode=false;
               this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    deleteActivity=async(id:string)=>{
        this.loading=true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                //remove activity from the list
                //this.activities=[ ...this.activities.filter(a=>a.id!==id)];
                this.activityRegistry.delete(id);
               // if(this.selectedActivity?.id===id) this.cancleSelectedActivity();
                this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

}