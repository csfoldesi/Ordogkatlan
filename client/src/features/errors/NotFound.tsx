import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oopps - we've looked everywhere and could not find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/" primary>
          Return to home
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
