import { Divider, Item } from "semantic-ui-react";
import { ProgramDTO } from "../../app/models/program";
import { TextWithLineBreaks } from "../../app/common/textWithLineBreaks";
import { format } from "date-fns";
import placeholderImage from "../../image-placeholder.png";

interface Props {
  program: ProgramDTO;
}

const baseImageUrl = "https://ordogkatlan.hu";

export default function ProgramListItem({ program }: Props) {
  const imageUrl = () => (program.thumbnail ? baseImageUrl + program.thumbnail : placeholderImage);

  return (
    <>
      <Item>
        <Item.Image src={imageUrl()} />
        <Item.Content>
          <Item.Header>{program.title}</Item.Header>
          <Item.Meta>
            {format(program.date, "EEEE (LLL. d.) ")}
            {program.startTime ? format(program.startTime, "HH:mm") : ""}
            {program.endTime ? format(program.endTime, "-HH:mm") : ""}
          </Item.Meta>
          <Item.Description>
            <TextWithLineBreaks>{program.description}</TextWithLineBreaks>
          </Item.Description>
          <Item.Extra>
            {program.villageName}, {program.stageName}
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider />
    </>
  );
}
