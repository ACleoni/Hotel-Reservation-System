import React, { Component } from 'react';
import
{
    View,
    TextInput,
    StyleSheet
} from 'react-native';

// Functions
const Service = require('../../service');
const { _inheritPropStyles } = Service;

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
            _inheritPropStyles([
                'width',
                'marginTop'
            ], this.props)
        ];

        return <TextInput
                    name={this.props.name}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onKeyPress={this.onKeyPress}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                    style={style}
                />
    }

    _renderInputContainer()
    {
        const style = [
            styles.inputContainer,
            _inheritPropStyles([
                'marginTop',
                this.props
            ])
        ]

        return <View style={style}>
                    {this._renderTextInput()}
                </View>
    }

    render()
    {
        return this._renderInputContainer()
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
        color: 'black',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        fontSize: 14,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 13
    }
});

export default Input