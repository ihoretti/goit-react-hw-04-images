import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Input, NameBtn, SearchBtn } from './Searchbar.styled';

//export class Searchbar extends Component {
// state = {
//  query: '',
//};
export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState(``);

  const handelChangeInput = e => {
    setQuery(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    // console.log(e.currentTarget.elements.query.value)
    //const { query } = this.state;
    // const { onSubmit } = this.props;
    onSubmit(query);

    reset();
  };

  const reset = () => {
    setQuery('');
  };

  //render()
  // const { query } = this.state;

  return (
    <Header>
      <Form onSubmit={handleSubmitForm}>
        <Input
          type="text"
          name="query"
          autocomplete="off"
          placeholder="Search images and photos"
          value={query}
          onChange={handelChangeInput}
        />
        <SearchBtn type="submit">
          <NameBtn>Search</NameBtn>
        </SearchBtn>
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
