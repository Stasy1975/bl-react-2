import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = { 
    querry: "",
  
  }

  handelInput = (event) => {
        const value = event.target.value;
    console.log(value)
  this.setState({querry:value})

  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.querry);
    this.props.handleForm(this.state.querry)
    this.setState({querry:""})
 }
  render() {
    return <>
        <SearchFormStyled onSubmit={this.handleSubmit}>
        <InputSearch onChange={this.handelInput} value={this.state.querry} /> 
        <FormBtn>
          <FiSearch />
        </FormBtn>
    </SearchFormStyled>
    </>
      ;
  }
}
