import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class DropdownButton extends Component {
    state = {
        dropdownOpen: false,
    };

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    render() {
        const { year, children } = this.props;
        return (
            <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
            >
                <DropdownToggle caret>
                    {year}
                </DropdownToggle>
                <DropdownMenu>
                    {children}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default DropdownButton;
