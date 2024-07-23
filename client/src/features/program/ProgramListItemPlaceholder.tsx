import { Item, Placeholder } from "semantic-ui-react";

export default function ProgramListItemPlaceholder() {
  return (
    <Item>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    </Item>
  );
}
