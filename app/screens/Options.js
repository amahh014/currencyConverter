/* eslint-disable spaced-comment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';
//import Icon from 'react-native-vector-icons';
import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

//const ICON_COLOR = '#868686';
//const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  };

    handleThemesPress = () => {
      this.props.navigation.navigate('Themes');
    }

    handleSitePress = () => {
      console.log('press site');
    }

    render() {
      return (
        <ScrollView>
          <StatusBar translucent={false} barStyle="default" />
          <ListItem
            text="Themes"
            onPress={this.handleThemesPress}
            //customIcon={
              //<Icon name="ios-arrow-forward" color={ICON_COLOR} size={ICON_SIZE} />
                //}
          />
          <Separator />
          <ListItem
            text="Fixer.io"
            onPress={this.handleSitePress}
            //customIcon={
              //Icon name="link" color={ICON_COLOR} size={ICON_SIZE} />
                //}
          />
          <Separator />
        </ScrollView>
      );
    }
}

export default connectAlert(Options);
