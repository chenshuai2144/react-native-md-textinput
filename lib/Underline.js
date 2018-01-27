import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default class Underline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineLength: new Animated.Value(0),
    };
    this.wrapperWidth = 0;
  }
  componentDidMount() {
    requestAnimationFrame(() => {
      if (this.wrapper == null) {
        return;
      }
      const container = this.wrapper;
      container.measure((left, top, width) => {
        this.wrapperWidth = width;
      });
    });
  }
  expandLine() {
    Animated.timing(this.state.lineLength, {
      toValue: this.wrapperWidth,
      duration: this.props.duration,
    }).start();
  }
  shrinkLine() {
    Animated.timing(this.state.lineLength, {
      toValue: 0,
      duration: this.props.duration,
    }).start();
  }
  render() {
    const { borderColor, highlightColor } = this.props;
    return (
      <View
        style={[
          styles.underlineWrapper,
          {
            backgroundColor: borderColor,
          },
        ]}
        ref={ref => (this.wrapper = ref)}
      >
        <Animated.View
          style={[
            {
              width: this.state.lineLength,
              height: 1,
              backgroundColor: highlightColor,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  underlineWrapper: {
    height: 1,
    alignItems: 'center',
  },
});
