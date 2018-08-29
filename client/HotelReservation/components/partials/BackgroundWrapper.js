import React, 
{
    Component
} from 'react';

import 
{
    View,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native';


// Functions
const Service = require('../../service');
const { _inheritPropStyles, _getPlatformValue} = Service;

const window = Dimensions.get('window');

class BackgroundWrapper extends Component 
{
    _renderChildren() 
    {
        let childrenArray = [];
        childrenArray.push(this.props.children);
        return childrenArray
    }

    _renderImageBackground() 
    {
        const style = [
            styles.containerImage,
            _inheritPropStyles([
                'paddingTop'
            ], this.props)
        ];
        return <ImageBackground source={require('../../images/background.jpg')} style={style}>
            {this._renderChildren()}
        </ImageBackground>
    }

    _renderViewBackground() 
    {
        const style = [
            styles.containerView,
            _inheritPropStyles([
                'paddingTop'
            ], this.props)
        ]
        return <View style={style}>
            {this.renderChildren()}
        </View>
    }

    render() 
    {
        if (this.props.transparent) return this._renderViewBackground();
        else return this._renderImageBackground();
        
    };
};

const styles = StyleSheet.create({
    containerImage: {
        width: window.width,
        height: window.height,
        opacity: .8,
        resizeMode: _getPlatformValue('android', 'cover', 'contain'),
        paddingTop: _getPlatformValue('android', 5, 22)
    },
    containerView: {
        flex: 1,
        paddingTop: _getPlatformValue('android', 5, 22)
    },
    icon: {
        marginLeft: 10,
        position: 'relative',
        top: 6,
        opacity: 0.8,
        backgroundColor: 'transparent'
    }
});

export default BackgroundWrapper