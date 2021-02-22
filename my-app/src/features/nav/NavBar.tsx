import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
function NavBar() {
  const activityStore = useContext(ActivityStore);
  const { openCreateFrom } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openCreateFrom} positive content="Create Activity"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NavBar);
