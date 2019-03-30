import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Route, Switch, Redirect } from "react-router-dom"

import Menu from "./Menu"

import Stats from "../pages/Stats"
import Dashboard from "../pages/Dashboard"
import ViewCoupon from "../pages/ViewCoupon"
import CreateCoupon from "../pages/CreateCoupon"
import ChooseCollab from "../pages/ChooseCollab"

import customerStat from "../../data/customers.js"
import coupnStat from "../../data/coupons.js"

import fetchFunction from "../../graphql/fetchFunction"
import getStoreId from "../../graphql/getStoreId"

const drawerWidth = 220

const styles = theme => ({
  container: {
    marginLeft: `calc(${drawerWidth}px)`,
    marginRight: `60px`,
    marginTop: "100px",
    maxWidth: "1200px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0",
      marginTop: "100px"
    }
  },
  root: {
    marginLeft: "60px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "60px",
      marginRight: "60px"
    }
  }
})

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      id: "",
      token: "",
      storeId: "",
      fetched: false
    }
    this.fetchStoreId = this.fetchStoreId.bind(this)
  }

  componentWillMount() {
    if (sessionStorage.getItem("auth")) {
      this.getUserInfo()
    } else {
      this.setState({ isLogin: false })
    }
  }

  componentDidMount() {
    this.fetchStoreId(this.state.token)
  }


  getUserInfo = () => {
    let data = JSON.parse(sessionStorage.getItem("auth"))
    let userInfo = {
      id: data.userId,
      token: data.token
    }
    this.setState(userInfo)
  }

  async fetchStoreId(token) {
    const body = getStoreId()

    const fetching = await fetchFunction(body, token)

    const resData = await fetching

    let result = resData.data.stores

    if (result.length !== 0) {
      this.setState({
        storeId: result[0]._id,
        name: result[0].creator.name,
        email: result[0].creator.email,
        fetched: true
      })
      this.name()
    } else {
      this.setState({ fetched: false })
    }
  }

  logout = () => {
    sessionStorage.setItem("auth", "")
    sessionStorage.clear()
    this.setState({ isLogin: false })
  }

  name = () => {
    if (this.state.name === null) {
      this.setState({ name: this.state.email.split("@")[0] })
    }
  }

  render() {
    const { classes } = this.props

    if (!this.state.isLogin) {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }

    const Wrapper = ({ children }) => (
      <div className={classes.root}>{children}</div>
    )
    return (
      <div className={classes.container}>
        <Menu logout={this.logout} name={this.state.name}/>
        <Wrapper>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />

            <Route
              path="/dashboard/stat/customers"
              component={() => (
                <Stats data={customerStat} keyData="customers" />
              )}
            />
            <Route
              path="/dashboard/stat/coupons"
              component={() => <Stats data={coupnStat} keyData="coupons" />}
            />

            <Route path="/dashboard/coupons/create" component={CreateCoupon} />
            <Route path="/dashboard/coupons" component={ViewCoupon} />

            <Route path="/dashboard/collab/create" component={ChooseCollab} />
            <Route
              path="/dashboard/collab/createCoupon/:collabStore"
              component={CreateCoupon}
            />
            <Route
              path="/dashboard/collab"
              component={() => (
                <ViewCoupon
                  storeId="5c8964fd425d32025f175ad5"
                  option="collab"
                />
              )}
            />

            <Route path="/dashboard/support" component={Stats} />
            <Route path="/dashboard/feedback" component={Stats} />
          </Switch>
        </Wrapper>
      </div>
    )
  }
}
export default withStyles(styles)(Body)
