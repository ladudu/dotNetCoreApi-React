import {observable,action,computed,makeObservable,configure,runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

configure({enforceActions:'always'});

class ActivityStore{
    constructor() {
      makeObservable(this);
    }
    @observable activityRegistry = new Map();
    @observable activities:IActivity[] = [];
    @observable loadingInitial = false;
    @observable activity:IActivity | null = null;
    @observable submitting = false;
    @observable target = '';
    @computed get activitiesByDate(){
      // return this.activities.slice().sort((a,b)=>(Date.parse(a.date)-Date.parse(b.date)));
      return Array.from(this.activityRegistry.values()).sort((a,b)=>(Date.parse(a.date)-Date.parse(b.date)));
    }

    @action loadActivities = async() =>{
        this.loadingInitial = true;
        try {
          const activities = await agent.Activities.list();
          runInAction(()=>{
            activities.forEach((activity: IActivity) => {
              activity.date = activity.date.split('.')[0];
              // this.activities.push(activity);
              this.activityRegistry.set(activity.id,activity);
            });
            this.loadingInitial = false
          });
         
        } catch (error) { 
          runInAction(()=>{
            this.loadingInitial = false
          });
          console.log(error);
        }
    }

    @action loadActivity = async(id:string) =>{
      let activity = this.getActivity(id);
      if(activity){
        this.activity = activity;
      }else{
        this.loadingInitial = true;
        try {
          activity = await agent.Activities.details(id);
          runInAction(()=>{
            this.activity = activity;
            this.loadingInitial = false;
          });
        } catch (error) {
          console.log(error);
          runInAction(()=>{
            this.loadingInitial = false;
          });

        }
      }
    }

    getActivity = (id:string) =>{
      return this.activityRegistry.get(id);
    }
    @action clearActivity = () =>{
      this.activity = null;
    }
    @action selectActivity = (id:string)=>{
      this.activity = this.activityRegistry.get(id);

    }
    @action createActivity = async (activity:IActivity) =>{
      this.submitting = true;
      try {
        await agent.Activities.create(activity);
        runInAction(()=>{
          this.activityRegistry.set(activity.id,activity);
          this.submitting = false;
        });
        // this.activities.push(activity);

      } catch (error) {
        runInAction(()=>{
          this.loadingInitial = false
        });
        console.log(error);
      }
    }
    @action editActivity = async (activity:IActivity) =>{
      this.submitting = true;
      try {
        await agent.Activities.update(activity);
        runInAction(()=>{
          this.activityRegistry.set(activity.id,activity);
          this.activity = activity;

          this.submitting = false;
        });

      } catch (error) {
        runInAction(()=>{
          this.loadingInitial = false
        });
        console.log(error);
      }
    }
    @action cancelSelectedActivity = () =>{
      this.activity = null;
    }
    @action deleteActivity = async (event:SyntheticEvent<HTMLButtonElement>,id:string) =>{

      this.submitting = true;
      this.target = event.currentTarget.name;
    // setTrget(event.currentTarget.name);
      try {
        await agent.Activities.delete(id);
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      } catch (error) {
        console.log(error);
        this.submitting = false;
        this.target = '';
      }
    }
}

export default createContext(new ActivityStore())