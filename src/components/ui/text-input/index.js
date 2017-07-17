import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './TextInput.scss';

function isEmpty(value) {
    return !value || value.trim() === '';
}

class TextInput extends Component {
    static propTypes = {
        value: PropTypes.string,
        className: PropTypes.string,
        wrapperClassName: PropTypes.string,
        style: PropTypes.object,
        wrapperStyle: PropTypes.object,
        inputProps: PropTypes.object,
        wrapperProps: PropTypes.object,
        onChange: PropTypes.func,

        focus: PropTypes.bool,
    };

    state = {
        isEmpty: false,
    };

    onChange = ({ target }) => {
        const { onChange } = this.props;
        onChange && onChange(target.value);
    };

    onBlur = ({ target: { value } }) => {
        if (isEmpty(value)) {
            this.setState({
                isEmpty: true,
            });
        }
    };

    render() {
        const {
            focus,
            value,
            className,
            wrapperClassName,
            style,
            wrapperStyle,
            inputProps,
            wrapperProps,
        } = this.props;

        const { isEmpty } = this.state;

        const mergedClassName = cn('sberTextInput', className);
        const mergedWrapperClassName = cn(
            'sberTextInputWrapper',
            wrapperClassName,
        );

        return (
            <div
                {...wrapperProps}
                className={mergedWrapperClassName}
                style={wrapperStyle}
            >
                <input
                    onBlur={this.onBlur}
                    {...inputProps}
                    ref={input => input && focus && input.focus()}
                    className={mergedClassName}
                    style={style}
                    type="text"
                    value={value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default TextInput;
