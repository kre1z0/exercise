import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../components/ui/text-input';
import AutoComplete from '../../components/ui/auto-complete';

function isEmpty(value) {
    return !value || value.trim() === '';
}

function valid(data = {}) {
    const errors = {};

    if (isEmpty(data.name)) {
        errors.name = 'Укажите имя';
    }

    return errors;
}

class Heroes extends Component {
    state = {
        value: this.props.name,
        complete: '',
        name: '',
    };
    rofl = value => this.setState({ value: value });
    go = value => this.setState({ name: value });
    gg = value => this.setState({ complete: value });
    submit = e => {
        e.preventDefault();
        console.log('--> submit', valid(this.state));
        this.setState({
            errors: valid(this.state),
        });
    };

    render() {
        const { value, name, complete } = this.state;
        console.log('--> heroes', this.state);
        const ggwp = ['Сотрудник 98', 'Сотрудник 95', 'Сотрудник 91'];
        return (
            <div>
                HEROES
                <form onSubmit={this.submit}>
                    <AutoComplete
                        values={ggwp}
                        value={complete}
                        onChange={this.gg}
                    />
                    <TextInput value={value} onChange={this.rofl} />
                    <TextInput value={name} onChange={this.go} />
                    <button type="submit">submit</button>
                </form>
            </div>
        );
    }
}

const mapProps = ({ test: { name } }) => ({
    name,
});

const mapActions = {};

export default connect(mapProps, mapActions)(Heroes);
