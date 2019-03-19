import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

import InformationBlock from "./InformationBlock"
import { Link } from 'react-router-dom';
import theme from '../theme';


const styles = (theme, props) => ({
  root: {
    padding: "60px 40px",
    minHeight: "80vh"
  },
  container: {
    maxWidth: "75rem",
    margin: "auto",
  },
  item: {
    margin: "20px auto",
    textAlign: "center",
  },
  img: {
    width: "100%"
  },
  button: {
    alignSelf: "center",
    marginTop: "20px",
    borderRadius: "24.5px",
    color: "white",
    background: "rgb(79, 201, 91)",
    "-webkit-box-shadow": "0px 0px 15px 5px rgba(17,211,188,.3)",
    "-moz-box-shadow": "0px 0px 15px 5px rgba(17,211,188,.3)",
    "box-shadow": "0px 0px 15px 5px rgba(17,211,188,.3)",
    "&:hover": {
      background: "white",
      color: "rgb(79, 201, 91)",
    }
  }
})

class Hero extends Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root} id={this.props.id}>
        <Grid
          container
          alignItems="center"
          alignContent="space-around"
          className={classes.container}
        >
          <Grid item xs={7} className={classes.item}>
            <InformationBlock
              header_1={this.props.header}
              para={this.props.para}
              header_align="center"
              align="center"
            />
            {this.props.button && (
              <Link to="/signup" style={{'textDecoration': 'none'}}>
                <Button
                  className={classes.button}
                  variant="contained"
                >
                  {this.props.button}
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item xs={10}className={classes.item}>
            {this.props.img && (
              <img
                className={classes.img}
                src={this.props.img}
                alt={this.props.alt}
              />
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Hero)
