import React, 
{
    Component
} from 'react';

import 
{
    View, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';

const Serivce = require('../../service/');
const { _inheritPropStyles } = Serivce;
import { TextStyle } from '../text';

class Button extends Component 
{
    render() 
    {
        const style = {
            ...styles.container,
            ..._inheritPropStyles([
                'marginTop', 
                'width', 
                'flex', 
                ], this.props)
        };

        return ( 
            <View style={styles.wrapper}>
                <TouchableOpacity style={style} 
                                    onPress={this.props.onPress}>
                    <TextStyle style={styles.text}>
                        {this.props.children}
                    </TextStyle>
                </TouchableOpacity>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    wrapper: 
    {
        alignItems: 'center'
    },
    container: 
    {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 47,
        paddingRight: 47,
        backgroundColor: '#80CC28',
        borderRadius: 5,
        alignItems: 'stretch',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: 
        {
            height: 2,
            width: 1
        }
    },
    text: 
    {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 3
    }
});

export default Button