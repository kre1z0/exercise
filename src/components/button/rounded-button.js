import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { paleGrey, darkGrey } from '../../assets/theme';
import './rounded-button.scss';

const RoundedButton = ({
    overlayStyle,
    style,
    buttonStyle,
    labelStyle,
    ...props
}) => {
    const labelColor = props.primary || props.secondary ? '#fff' : darkGrey;
    const border = props.primary || props.secondary
        ? 'none'
        : `1px solid ${paleGrey}`;
    const height = props.primary || props.secondary ? 34 : 32;
    return (
        <RaisedButton
            {...props}
            className="rounded-button"
            labelStyle={{
                ...labelStyle,
                padding: '0 15px',
                textTransform: 'none',
                color: labelColor,
                fontWeight: 500,
            }}
            overlayStyle={{ ...overlayStyle, borderRadius: 17 }}
            style={{
                ...style,
                height: 34,
                borderRadius: 17,
                boxShadow: 'none',
                border: border,
            }}
            buttonStyle={{
                ...buttonStyle,
                height: height,
                borderRadius: 17,
            }}
        />
    );
};

export default RoundedButton;
