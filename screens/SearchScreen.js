import React from 'react';
import {
  Container, Text, Header, Content, Button, Footer, FooterTab,
} from 'native-base';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

const transferImage = require('../assets/images/money-transfer.svg');
const workerImage = require('../assets/images/worker.svg');

const type = {
  timeout: {
    label: 'Maaf tidak ada pemijat di sekitar anda',
    image: transferImage,
  },
  search: {
    label: 'Tunggu sistem sedang mencari pemijat',
    image: workerImage,
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
        <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>
            { this.renderData().label }
          </Text>
          <Image
            style={{ width: 200, height: 200, marginTop: 20 }}
            source={this.renderData().image}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={this.batalkanPesanan}>
              <Text>Batalkan Pesanan</Text>
            </Button>
          </FooterTab>
        </Footer>
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
