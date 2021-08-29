import React, { ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Box } from '@material-ui/core'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const useStyles = makeStyles<Theme, Pick<Props, 'sticky'>>(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    tabsContainer: {
      position: ({ sticky }) => (sticky ? 'sticky' : undefined),
      top: 0,
      backgroundColor: theme.palette.background.paper,
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      boxShadow: '0px 10px 15px -5px rgb(0 0 0 / 20%)',
      marginLeft: '-1rem',
      marginRight: '-1rem'
    },
    tab: {
      '&.MuiTab-textColorPrimary.Mui-selected': {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.common.black
      }
    }
  })
)

type Props = {
  tabs: Array<{
    label: string
    content: ReactElement
  }>
  sticky?: boolean
}

export default function ScrollableTabsButtonAuto({ tabs, sticky }: Props) {
  const classes = useStyles({ sticky })
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabsContainer}
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
      >
        {tabs.map((tab, index) => (
          <Tab
            className={classes.tab}
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel value={index} index={tabIndex}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  )
}
