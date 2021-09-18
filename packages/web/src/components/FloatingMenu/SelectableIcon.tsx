import { Check as CheckIcon, NotInterested } from '@material-ui/icons'

export const SelectableIcon = ({ selected }: { selected: boolean }) =>
  selected ? (
    <CheckIcon
      fontSize="small"
      style={{
        marginRight: 10
      }}
    />
  ) : (
    <NotInterested
      fontSize="small"
      style={{
        marginRight: 10
      }}
    />
  )
