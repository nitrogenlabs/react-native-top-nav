import * as PropTypes from 'prop-types';
import * as React from 'react';
import {StyleSheet, Text, TextStyle, TouchableHighlight, View, ViewStyle} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {uiTheme} from './UITheme';

export interface TopNavProps {
  readonly children?: string;
  readonly onBack?: () => void;
  readonly onCancel?: () => void;
  readonly style?: ViewStyle;
  readonly theme?: any;
}

export class TopNav extends React.PureComponent<TopNavProps, object> {
  private componentTheme: any;

  static propTypes: object = {
    children: PropTypes.string,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
    theme: PropTypes.object
  };

  constructor(props: TopNavProps) {
    super(props);

    // Get component theme
    this.componentTheme = {...uiTheme, ...props.theme};
  }

  renderBack(): JSX.Element {
    const {
      topNavFont,
      topNavIconSize,
      topNavTextButtonSize,
      topNavTextColor
    } = this.componentTheme;
    const iconStyle: TextStyle = {color: topNavTextColor, fontSize: topNavIconSize};
    const labelStyle: TextStyle = {
      color: topNavTextColor,
      fontFamily: topNavFont,
      fontSize: topNavTextButtonSize
    };

    if(this.props.onBack) {
      return (
        <TouchableHighlight underlayColor="transparent" onPress={this.props.onBack}>
          <View style={viewStyles.topMenuGroup}>
            <MaterialIcon name="chevron-left" style={iconStyle} />
            <Text style={[viewStyles.topMenuItem, labelStyle]}>Back</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <View style={[viewStyles.topMenuGroup, viewStyles.placeholder]}>
          <MaterialIcon name="close" style={iconStyle} />
          <Text style={[viewStyles.topMenuItem, labelStyle]}>Cancel</Text>
        </View>
      );
    }
  }

  renderCancel(): JSX.Element {
    const {
      topNavFont,
      topNavIconSize,
      topNavTextButtonSize,
      topNavTextColor
    } = this.componentTheme;
    const iconStyle: TextStyle = {color: topNavTextColor, fontSize: topNavIconSize};
    const labelStyle: TextStyle = {
      color: topNavTextColor,
      fontFamily: topNavFont,
      fontSize: topNavTextButtonSize
    };

    if(this.props.onCancel) {
      return (
        <TouchableHighlight underlayColor="transparent" onPress={this.props.onCancel}>
          <View style={viewStyles.topMenuGroup}>
            <Text style={[viewStyles.topMenuItem, labelStyle]}>Cancel</Text>
            <MaterialIcon name="close" style={iconStyle} />
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <View style={[viewStyles.topMenuGroup, viewStyles.placeholder]}>
          <Text style={[viewStyles.topMenuItem, labelStyle]}>Back</Text>
          <MaterialIcon name="chevron-left" style={iconStyle} />
        </View>
      );
    }
  }

  render(): JSX.Element {
    const {children, style} = this.props;
    const {
      topNavFont,
      topNavMarginBottom = 0,
      topNavMarginLeft = 0,
      topNavMarginRight = 0,
      topNavMarginTop = 0,
      topNavTextButtonSize,
      topNavTextColor
    } = this.componentTheme;
    const containerStyle: TextStyle = {
      marginBottom: topNavMarginBottom,
      marginLeft: topNavMarginLeft,
      marginRight: topNavMarginRight,
      marginTop: topNavMarginTop
    };
    const titleStyle: TextStyle = {
      color: topNavTextColor,
      fontFamily: topNavFont,
      fontSize: topNavTextButtonSize
    };

    return (
      <View style={[viewStyles.topMenuBar, containerStyle, style]}>
        {this.renderBack()}
        <Text style={[viewStyles.topMenuText, titleStyle]}>{children}</Text>
        {this.renderCancel()}
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  placeholder: {
    opacity: 0
  },
  topMenuBar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5
  },
  topMenuGroup: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  topMenuItem: {
    backgroundColor: 'transparent',
    width: 50
  },
  topMenuText: {
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  }
});
