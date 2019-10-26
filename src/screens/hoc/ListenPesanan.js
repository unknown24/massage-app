import React from 'react';
// import hoistNonReactStatic from 'hoist-non-react-statics';
// import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import initApp from '../../../library/firebase/firebase';
import { getLastString } from '../../../library/String';

const firebase = initApp();
const dbh = firebase.firestore();

const WrapperWithListening = (Component) => {
  class WithListening extends React.Component {
    componentDidMount() {
      const { user_id } = this.props;
      this.listenToPesanan(user_id);
    }

    listenToPesanan(user_id) {
      const { onChangeEvent } = this.props;
      dbh.collection('pesananClient').where('user_id', '==', user_id)
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added' || change.type === 'modified') {
              const pesanan = [];
              querySnapshot.forEach((doc) => {
                pesanan.push({
                  id_pesanan: getLastString(doc._document.proto.name), //eslint-disable-line
                  user_id: doc.data().user_id,
                  partner_id: doc.data().partner_id,
                  status: doc.data().status,
                });
              });
              onChangeEvent(pesanan);
            }
          });
        });
    }

    render() {
      return <Component {...this.props} />; // eslint-disable-line
    }
  }

  WithListening.propTypes = {
    user_id: PropTypes.string.isRequired,
    onChangeEvent: PropTypes.func.isRequired,
  };

  return WithListening;
};

export default WrapperWithListening;
