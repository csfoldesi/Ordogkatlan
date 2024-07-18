import { useState } from "react";
import { Button, SemanticCOLORS } from "semantic-ui-react";

interface Props {
  title: string;
  color?: SemanticCOLORS | undefined;
  activeColor?: SemanticCOLORS | undefined;
}

export default function ToggleButton(props: Props) {
  const { title, color, activeColor } = props;
  const [active, setActive] = useState(false);

  return (
    <Button color={active ? activeColor : color} active={active} onClick={() => setActive(!active)}>
      {title}
    </Button>
  );
}
