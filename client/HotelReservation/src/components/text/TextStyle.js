
import React, 
{ 
    Component
} from 'react';

import 
{ 
    Text
} from 'react-native';

// Functions
const Service = require('../../service');
const { _inheritPropStyles } = Service;

class TextStyle extends Component 
{
    render () 
    {
        const style = _inheritPropStyles([
            'fontFamily', 
            'fontSize', 
            'fontWeight', 
            'color', 
            'marginTop'
        ], this.props);

        return (
            <Text {...this.props} style={style}>
                {this.props.children}
            </Text>
        )
    };
};

TextStyle.defaultProps = {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    color: '#fff'
}

export default TextStyle