import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { withNavigation } from 'react-navigation';

function enhance(WrappedComponent) {
  class Enhance extends React.Component {
      static navigationOptions = {
        header: null,
        tabBarVisible: false,
      };
  }
  const WithNavigationComponent = withNavigation(Enhance);
  hoistNonReactStatic(WithNavigationComponent, WrappedComponent);
  return Enhance;
}

export default enhance;
