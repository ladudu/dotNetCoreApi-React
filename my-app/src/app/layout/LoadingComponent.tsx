import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

type props = {
  inverted?: boolean;
  content?: string;
};

function LoadingComponent({ inverted = true, content }: props) {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}

export default LoadingComponent;
