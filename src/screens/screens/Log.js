import React, { useEffect } from 'react';
import {
  Container, Header, Content, Form, Textarea,
} from 'native-base';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

function Log(props) {
  const { text, onMounted } = props;
  useEffect(() => {
    onMounted();
  }, []);

  return (
    <Container>
      <Header />
      <Content padder>
        <Form>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Textarea rowSpan={25} bordered placeholder="Textarea" value={text} />
          </TouchableWithoutFeedback>
        </Form>
      </Content>
    </Container>
  );
}

Log.propTypes = {
  onMounted: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Log;
