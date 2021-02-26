import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailSideBar from './ActivityDetailedSideBar';

interface DetailParams {
  id: string;
}
function ActivityDetail({ match }: RouteComponentProps<DetailParams>) {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);

  if (loadingInitial) return <LoadingComponent content="loading activity..." />;
  if (!activity) return <h1>Activity not found</h1>;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activity={activity} />
      </GridColumn>
      <GridColumn width={6}>
        <ActivityDetailSideBar activity={activity} />
      </GridColumn>
    </Grid>
  );
}

export default observer(ActivityDetail);
