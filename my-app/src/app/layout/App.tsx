import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id == id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter((a) => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id:string) => {
    setActivities([...activities.filter((a) => a.id !== id)]);

  };
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities ').then((res) => {
      console.log(res.data);
      let activities: IActivity[] = [];
      res.data.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, []);
  // componentDidMount(){
  //   axios.get<IActivity[]>('http://localhost:5000/api/activities ')
  //     .then((res) =>{
  //       // console.log(res);
  //       this.setState({
  //         activities : res.data
  //       })
  //     })
  // }
  return (
    <Fragment>
      <NavBar openCreateFrom={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity = {handleDeleteActivity}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
};
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
