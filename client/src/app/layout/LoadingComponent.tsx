import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponent({ content, inverted }: Props) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader>{content}</Loader>
    </Dimmer>
  );
}
