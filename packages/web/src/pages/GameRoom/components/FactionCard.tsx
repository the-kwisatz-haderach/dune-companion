import { Faction } from '@dune-companion/engine'
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(3)
    }
  })
)

type Props = {
  onSelectFaction: () => void
  isSelected: boolean
  disabled: boolean
}

export const FactionCard: React.FC<Faction & Props> = ({
  onSelectFaction,
  name,
  description,
  isSelected,
  disabled
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography variant="h6">{name}</Typography>
      <Typography>{description}</Typography>
      <Button
        disabled={disabled}
        variant="contained"
        color={isSelected ? 'default' : 'primary'}
        onClick={onSelectFaction}
      >
        {disabled
          ? 'Selected by other player'
          : isSelected
          ? 'Deselect'
          : 'Select faction'}
      </Button>
    </Box>
  )
}
