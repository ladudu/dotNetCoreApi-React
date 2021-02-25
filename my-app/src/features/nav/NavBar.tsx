import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import { NavLink } from 'react-router-dom';
function NavBar() {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} to="/" exact>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button positive content="Create Activity" as={NavLink} to="/createActivity"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NavBar);
