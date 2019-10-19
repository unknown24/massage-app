import React from 'react';
import {
  Container, Text, View, Header, Content, Button,
} from 'native-base';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

const transfer = require('../assets/images/money-transfer.svg');
const worker = require('../assets/images/worker.svg');

const type = {
  timeout: {
    label: 'Maaf tidak ada pemijat di sekitar anda',
    image: transfer,
  },
  search: {
    label: 'Tunggu sistem sedang mencari pemijat',
    image: worker,
  },
};

export default class PesananScreen extends React.Component {
  batalkanPesanan = () => {
    const { onBatalPesan } = this.props;
    onBatalPesan();
  }

  renderData() {
    const { tipe } = this.props;
    return {
      label: type[tipe].label,
      image: type[tipe].image,
    };
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text style={{ textAlign: 'center' }}>
            { this.renderData().label }
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 200, textAlign: 'center' }}
              source={this.renderData().image}
            />
          </View>
          <Button
            onPress={this.batalkanPesanan}
            style={{ justifyContent: 'center' }}
          >
            <Text> Batalkan Pesanan </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

PesananScreen.defaultProps = {
  tipe: 'search',
  onBatalPesan: () => {},
};

PesananScreen.propTypes = {
  tipe: PropTypes.oneOf(['timeout', 'search']),
  onBatalPesan: PropTypes.func,
};
