import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
    state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardTrunfo: false,
      cardRare: 'normal',
      isSaveButtonDisabled: true,
      savedCards: [],
    }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({ [name]: value });

    this.setState(() => ({
      isSaveButtonDisabled: true,
    }), this.validateButton);
  }

  validateButton = () => {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, attrSum } = this.state;
    const max = 90;
    const sumAtrrt = parseFloat(cardAttr1) + parseFloat(cardAttr2)
    + parseFloat(cardAttr3);
    const maxSum = 210;
    if (attrSum > maxSum) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
    if (cardName !== '' && cardImage !== '' && cardDescription !== '') {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
    if (cardAttr1 > max || cardAttr2 > max || cardAttr3 > max) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
    if (cardAttr1 < 0 || cardAttr2 < 0 || cardAttr3 < 0) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
    if (sumAtrrt > maxSum) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  onSaveButtonClick = () => {
    const { cardAttr3, cardImage, cardTrunfo, cardRare,
      cardName, cardDescription, cardAttr1, cardAttr2, savedCards } = this.state;
    const card = { cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2 };
    this.setState(savedCards.push(card));
    console.log(cardAttr1 + cardAttr2 + cardAttr3);
  };

  hasTrunfo1 = () => {
    const { savedCards } = this.state;
    if (savedCards.find((trunfo) => trunfo.cardTrunfo === true).length > 0) {
      return true;
    }
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2 } = this.state;
    const { cardAttr3, cardImage, cardTrunfo, cardRare,
      isSaveButtonDisabled, savedCards, hasTrunfo1 } = this.state;
    const { onInputChange, onSaveButtonClick } = this;
    return (
      <section>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardTrunfo={ cardTrunfo }
          cardRare={ cardRare }
          onInputChange={ onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ onSaveButtonClick }
          savedCards={ savedCards }
        />

        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardTrunfo={ cardTrunfo }
          cardRare={ cardRare }
          hasTrunfo1={ hasTrunfo1 }
        />
      </section>
    );
  }
}

export default App;
