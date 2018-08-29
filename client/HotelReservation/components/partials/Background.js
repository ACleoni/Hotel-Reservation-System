import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View,
        ImageBackground,
        Dimensions,
        ToucableOpacity,
        StyleSheet,
        } from 'react-native';

import {inheritPropStyles, getPlatformValue} from '../../service';

const window = Dimensions.get('window');

export default class BackgroundWrapper extends Component {
    _renderChildren() {
        let childrenArray = [];
        childrenArray.push(this.props.children);
        return childrenArray
    }

    _renderImageBackground() {
        const style = [
            styles.containerImage,
            getStyleFromProps(['paddingTop'], this.props)
        ];
        return <ImageBackground source={require('../../images/mainbg.jpg')} style={style}>
            {this._renderChildren()}
        </ImageBackground>
    }

    _renderViewBackground() {
        const style = [
            styles.containerView,
            getStyleFromProps(['paddingTop'], this.props)
        ]
        return <View style={style}>
            {this.renderChildren()}
        </View>
    }

    render() {
        if (this.props.transparent) return this._renderViewBackground();
        else return this._renderImageBackground();
        
    };
};

BackgroundWrapper.propTypes = {
    iconLeft: PropTypes.string,
    onPressIcon: PropTypes.func,
    paddingTop: PropTypes.number
}

const styles = StyleSheet.create({
    containerImage: {
        width: window.width,
        height: window.height,
        opacity: .8,
        resizeMode: getPlatformValue('android', 'cover', 'contain'),
        paddingTop: getPlatformValue('android', 5, 22)
    },
    containerView: {
        flex: 1,
        paddingTop: getPlatformValue('android', 5, 22)
    },
    icon: {
        marginLeft: 10,
        position: 'relative',
        top: 6,
        opacity: 0.8,
        backgroundColor: 'transparent'
    }
})