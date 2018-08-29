import React, { Component } from 'react';
import
{
    View,
    TextInput,
    StyleSheet
} from 'react-native';

// Functions
const Utils = require('../../service');
const { inheritPropStyles } = Utils;

class Input extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }

    _renderTextInput() 
    {
        const style = [
            styles.input,
            inheritPropStyles([
                'width', 
                this.props
            ])
        ];

        return <TextInput
                    name={this.props.name}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onKeyPress={this.onKeyPress}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                />
    }

    _renderInputContainer()
    {
        const style = [
            styles.inputContainer,
            inheritPropStyles([
                'marginTop',
                this.props
            ])
        ]

        return <View style={style}>
                    {this._renderTextInput}
                </View>
    }

    render()
    {
        return this._renderInputContainer
    }
}

const styles = StyleSheet.create({
    inputContainer: 
    {
        position: 'relative',
        height: 51,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: 
    {
        height: 45.76,
        width: 297.74,
        color: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
        fontSize: 14,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 13
    }
});