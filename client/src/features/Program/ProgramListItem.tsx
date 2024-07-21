import { Divider, Icon, Item, Label } from "semantic-ui-react";
import { ProgramDTO } from "../../app/models/program";
import { TextWithLineBreaks } from "../../app/common/textWithLineBreaks";
import { format } from "date-fns";
import placeholderImage from "../../image-placeholder.png";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  program: ProgramDTO;
}

const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

export default observer(function ProgramListItem({ program }: Props) {
  const { accoutStore, programStore } = useStore();
  const { isLoggedIn } = accoutStore;

  const imageUrl = () => (program.thumbnail ? baseImageUrl + program.thumbnail : placeholderImage);

  const handleFavoriteClick = (program: ProgramDTO) => {
    programStore.toggleProgramSelect(program);
  };

  const styles = {
    iconDefault: {
      paddingLeft: "10px",
      color: "rgba(0,0,0,.87)",
    },
    iconSelected: {
      paddingLeft: "10px",
      color: "#ffb70a",
    },
  };

  return (
    <>
      <Item>
        <Item.Image src={imageUrl()} size="medium" />
        <Item.Content>
          <Item.Header>
            {program.title}
            {isLoggedIn && (
              <Icon
                style={program.isSelected ? styles.iconSelected : styles.iconDefault}
                name="favorite"
                onClick={() => handleFavoriteClick(program)}
              />
            )}
          </Item.Header>
          <Item.Meta>
            {format(program.date, "EEEE (LLL. d.) ")}
            {program.startTime ? format(program.startTime, "HH:mm") : ""}
            {program.endTime ? format(program.endTime, "-HH:mm") : ""}
          </Item.Meta>
          <Item.Description>
            <TextWithLineBreaks>{program.description}</TextWithLineBreaks>
          </Item.Description>
          <Item.Extra>
            <Label active>{program.villageName}</Label> {program.stageName}
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider />
    </>
  );
});
