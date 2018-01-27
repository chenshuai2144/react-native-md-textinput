import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

export default class TextField extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.value) {
      if (nextProps.value.length !== 0) {
        this.floatingLabel.floatLabel();
      } else {
        this.floatingLabel.sinkLabel();
      }
      this.setState({ text: nextProps.value });
    }
  }
  focus = () => {
    this.input.focus();
  };
  blur = () => {
    this.input.blur();
  };
  isFocused() {
    return this.state.isFocused;
  }
  render() {
    const {
      label,
      highlightColor,
      duration,
      labelColor,
      borderColor,
      textColor,
      textFocusColor,
      textBlurColor,
      onFocus,
      onBlur,
      onChangeText,
      value,
      dense,
      inputStyle,
      wrapperStyle,
      labelStyle,
      ...props
    } = this.props;
    return (
      <View
        style={[dense ? styles.denseWrapper : styles.wrapper, wrapperStyle]}
        ref={ref => (this.wrapper = ref)}
      >
        <TextInput
          style={[
            dense ? styles.denseTextInput : styles.textInput,
            {
              color: textColor,
            },
            this.state.isFocused && textFocusColor
              ? {
                  color: textFocusColor,
                }
              : {},
            !this.state.isFocused && textBlurColor
              ? {
                  color: textBlurColor,
                }
              : {},
            inputStyle,
          ]}
          onFocus={() => {
            this.setState({ isFocused: true });
            this.floatingLabel.floatLabel();
            this.underline.expandLine();
            if (onFocus) {
              onFocus();
            }
          }}
          onBlur={() => {
            this.setState({ isFocused: false });
            if (!this.state.text.length) {
              this.floatingLabel.sinkLabel();
            }
            this.underline.shrinkLine();
            if (onBlur) {
              onBlur();
            }
          }}
          onChangeText={text => {
            this.setState({ text });
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          ref={ref => (this.input = ref)}
          value={this.state.text}
          {...props}
        />
        <Underline
          ref={ref => (this.underline = ref)}
          highlightColor={highlightColor}
          duration={duration}
          borderColor={borderColor}
        />
        <FloatingLabel
          isFocused={this.state.isFocused}
          ref={ref => (this.floatingLabel = ref)}
          focusHandler={this.focus.bind(this)}
          label={label}
          labelColor={labelColor}
          highlightColor={highlightColor}
          duration={duration}
          dense={dense}
          hasValue={!!this.state.text.length}
          style={labelStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 72,
    paddingTop: 30,
    paddingBottom: 7,
    position: 'relative',
  },
  denseWrapper: {
    height: 60,
    paddingTop: 28,
    paddingBottom: 4,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    height: 34,
    lineHeight: 34,
  },
  denseTextInput: {
    fontSize: 13,
    height: 27,
    lineHeight: 24,
    paddingBottom: 3,
  },
});
