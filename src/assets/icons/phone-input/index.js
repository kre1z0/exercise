import React, { Component } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import styled from 'styled-components';
import CountryCodes from './country-codes.js';

const countries = Object.keys(CountryCodes).filter(country => CountryCodes[country].code).map(countryCode => {
  const flag = require(`./flags/${countryCode.toLowerCase()}.svg`);
  return {
    img: flag,
    value: countryCode,
    name: CountryCodes[countryCode].name,
    code: CountryCodes[countryCode].code
  };
});

const PhoneInputDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PhoneInputDropdown = styled(Dropdown) `
  flex-grow: 1;
  height: 100%;
  padding: 0 0;
`;

const PhoneInputWrapper = styled.div`
  padding: 20px 0;
  flex-grow: 10;
`;

const PhoneInputInput = styled.input`
  height: 84%;
  width: 100%;
`;

class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'AF',
      input: '+93',
      countries
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.filterCountriesByGivenNumber = this.filterCountriesByGivenNumber.bind(this);
  }
  handleDropdownChange(value) {
    this.setState({
      country: value,
      input: `+${this.state.countries.filter(c => c.value === value)[0].code}`
    });
  }
  handleInputChange(e) {
    let value = e.target.value ? e.target.value : '+';

    if (value !== '+' && !isFinite(value)) {
      return;
    }

    if (value[0] !== '+') {
      value = `+${value}`;
    }

    this.setState({
      input: value,
      countries: this.filterCountriesByGivenNumber(value.substr(1, 4))
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  filterCountriesByGivenNumber(number) {
    if (!number) {
      return countries;
    }

    let newCountries = countries.filter(({ code }) => code.includes(number));
    if (newCountries.length === 0) {
      return this.filterCountriesByGivenNumber(number.substr(0, number.length - 1));
    }
    this.setState({
      country: newCountries[0].value
    });
    return newCountries;
  }

  customItem(item) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      fontSize: 'initial'
    };

    const imageStyle = {
      display: 'flex',
      width: '15px',
      height: '15px',
      flexGrow: 0,
      backgroundColor: '#ccc',
      marginRight: '5px'
    };

    return (
      <div style={containerStyle}>
        <img src={item.img} style={imageStyle} /> {item.name}
      </div>
    );
  }

  render() {
    return (
      <PhoneInputDiv>
        <PhoneInputDropdown
          auto
          onChange={this.handleDropdownChange}
          source={this.state.countries}
          value={this.state.country}
          template={this.customItem}
        />
        <PhoneInputWrapper>
          <PhoneInputInput onChange={this.handleInputChange} value={this.state.input} />
        </PhoneInputWrapper>
      </PhoneInputDiv>
    );
  }
}

export default PhoneInput;