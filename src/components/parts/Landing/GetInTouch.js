import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import InformationBlock from "./InformationBlock"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import background from "../../../assets/contact_blur.jpg"

const styles = theme => ({
  root: {
    margin: "auto",
    padding: "60px 40px",
    // backgroundColor: `#F5F5F5`,
    background: `url(${background}), rgba(0,0,0,0.8)`,
    backgroundSize: "cover",
    backgroundBlendMode: "multiply"
  },
  container: {
    maxWidth: "75rem",
    margin: "auto",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#4FC95B",
    color: "white",
    borderRadius: "24.5px",
    width: "125px",
    "&:hover": {
      color: "#4FC95B",
      backgroundColor: "white",
    },
    margin: "20px 0"
  },
  icon: {
    marginBottom: "-5px",
    marginRight: "10px",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  },
  socialIcon: {
    marginRight: "20px",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  },
  cssLabel: {
    color: 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
})

const labels = ["First Name", "Last Name", "Email", "Phone"]

function form(classes, _class, button) {
  return (
    <form className={_class} noValidate autoComplete="off">
      <Grid container spacing={16} justify="center">
      {labels.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              className={classes.input}
              label={item}
              margin="dense"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
        )
      })}
        <Grid item xs={12} sm={12}>
          <TextField
            className={classes.input}
            id="filled-multiline-flexible"
            label="Message"
            multiline
            rows="4"
            margin="dense"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </Grid>
        <Button href="#" color="primary" className={button} variant="outlined">
          Submit
        </Button>
      </Grid>
    </form>
  )
}

const GetInTouch = props => {
  const classes = props.classes
  return (
    <div className={classes.root} id={props.id}>
      <Grid
        container
        spacing={24}
        className={classes.container}
        justify="center"
      >
        <Grid item xs={12} md={8}>
          <InformationBlock
            header_2={props.header}
            para={props.para}
            paraDark={props.paraDark}
            align="center"
          />
          {form(classes, classes.form, classes.button)}
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(GetInTouch)
