import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface IProps {
  openCreateFrom: () => void;
}
function NavBar({ openCreateFrom }: IProps) {
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

export default NavBar;
