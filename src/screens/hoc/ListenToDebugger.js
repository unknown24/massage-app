import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import initApp from '../../../library/firebase/firebase';

const firebase = initApp();
const dbh = firebase.firestore();

const WrapperWithListening = (Component) => {
  class WithListening extends React.Component {
    componentDidMount() {
      this.listenToDebug();
    }

    listenToDebug() {
      dbh.collection('debug').doc('rdOHoqxlmmK9EI6Dptrv')
        .onSnapshot((doc) => {
          console.log('Current data: ', doc.data());
          const objectz = doc.data();
          if (objectz.fn !== '') {
            this.props.runDebug(objectz);
          } else {
            this.props.onChangeDebug(objectz);
          }
        });
    }

    render() {
      return <Component {...this.props} />; // eslint-disable-line
    }
  }

  hoistNonReactStatic(WithListening, Component);

  return WithListening;
};

export default WrapperWithListening;
