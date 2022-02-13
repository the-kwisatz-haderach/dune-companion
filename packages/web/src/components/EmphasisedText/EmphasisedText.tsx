import { createStyles, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: 'justify',
      lineHeight: 1.6,
      '&::first-letter': {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '300%',
        float: 'left',
        marginRight: '6px',
        marginTop: '13px',
        lineHeight: 0.5
      }
    }
  })
)

export const EmphasisedText: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Typography className={classes.root} variant="body2">
      {children}
    </Typography>
  )
}
