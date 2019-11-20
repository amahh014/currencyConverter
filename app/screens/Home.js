/* eslint-disable prefer-destructuring */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';
import { connectAlert } from '../components/Alert';


class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    isFetching: PropTypes.bool,
    primaryColor: PropTypes.string,
    currencyError: PropTypes.string,
    alertWithType: PropTypes.func,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    const { currencyError, alertWithType } = this.props;
    if (nextProps.currencyError && !currencyError) {
      alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  handleChangeText = (text) => {
    // eslint-disable-next-line no-console
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base'
    });
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote'
    });
  };

  handleSwapCurrency = () => {
    // eslint-disable-next-line no-console
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    // eslint-disable-next-line no-console
    this.props.navigation.navigate('Options');
  };

  render() {
    let quotePrice = '...';
    if (!this.props.isFetching) {
      quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    }
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <Logo tintColor={this.props.primaryColor} />
        <InputWithButton
          buttonText={this.props.baseCurrency}
          onPress={this.handlePressBaseCurrency}
          defaultValue={this.props.amount.toString()}
          keyboardType="numeric"
          onChangeText={this.handleChangeText}
          textColor={this.props.primaryColor}
        />
        <InputWithButton
          editable={false}
          buttonText={this.props.quoteCurrency}
          onPress={this.handlePressQuoteCurrency}
          value={quotePrice}
          textColor={this.props.primaryColor}
        />
        <LastConverted
          date={this.props.lastConvertedDate}
          base={this.props.baseCurrency}
          quote={this.props.quoteCurrency}
          conversionRate={this.props.conversionRate}
        />
        <ClearButton
          text="Reverse Currencies"
          onPress={this.handleSwapCurrency}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionsSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionsSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    lastConvertedDate: conversionsSelector.date ? new Date(conversionsSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
