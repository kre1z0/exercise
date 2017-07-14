import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../components/ui/text-input';
import AutoComplete from '../../components/ui/auto-complete';

class Heroes extends Component {
    state = {
        value: this.props.name,
        complete: '',
    };
    rofl = value => this.setState({ value: value });
    gg = value => this.setState({ complete: value });

    render() {
        const { value, complete } = this.state;
        const ggwp = ['Сотрудник 98', 'Сотрудник 95', 'Сотрудник 91'];
        return (
            <div>
                HEROES
                <AutoComplete
                    values={ggwp}
                    value={complete}
                    onChange={this.gg}
                />
                <TextInput value={value} onChange={this.rofl} />
            </div>
        );
    }
}

const mapProps = ({ test: { name } }) => ({
    name,
});

const mapActions = {};

export default connect(mapProps, mapActions)(Heroes);
