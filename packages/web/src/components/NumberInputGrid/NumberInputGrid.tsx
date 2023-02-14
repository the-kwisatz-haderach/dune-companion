import { Button, Grid } from '@material-ui/core'

export interface Props {
  disabled: boolean
  max: number
  onChange: (value: number) => void
}

export const NumberInputGrid = ({ disabled, max, onChange }: Props) => (
  <Grid container spacing={1}>
    <Grid item xs={4}>
      <Button
        onClick={() => onChange(4)}
        fullWidth
        disabled={disabled || max < 4}
        variant="contained"
        color="primary"
      >
        +4
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button
        onClick={() => onChange(5)}
        fullWidth
        disabled={disabled || max < 5}
        variant="contained"
        color="primary"
      >
        +5
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button
        onClick={() => onChange(6)}
        fullWidth
        disabled={disabled || max < 6}
        variant="contained"
        color="primary"
      >
        +6
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        onClick={() => onChange(2)}
        fullWidth
        disabled={disabled || max < 2}
        variant="contained"
        color="primary"
      >
        +2
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        onClick={() => onChange(3)}
        fullWidth
        disabled={disabled || max < 3}
        variant="contained"
        color="primary"
      >
        +3
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button
        onClick={() => onChange(1)}
        fullWidth
        disabled={disabled || max < 1}
        variant="contained"
        color="primary"
      >
        +1
      </Button>
    </Grid>
  </Grid>
)
