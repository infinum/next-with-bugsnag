import Link from 'next/link';
import React from 'react';

export default class Index extends React.Component {
  public static getInitialProps({ query }: any) {
    if (query.raiseError) {
      throw new Error('Error in getInitialProps');
    }
  }

  public state = {
    raiseError: false,
    raiseErrorInUpdate: null,
    raiseErrorInRender: null,
  };

  public componentDidUpdate() {
    if (this.state.raiseErrorInUpdate) {
      throw new Error('Error in componentDidUpdate');
    }
  }

  public raiseErrorInUpdate = () => this.setState({ raiseErrorInUpdate: '1' });
  public raiseErrorInRender = () => this.setState({ raiseErrorInRender: '1' });

  public render() {
    if (this.state.raiseErrorInRender) {
      throw new Error('Error in render');
    }

    return (
      <div>
        <h2>Index page</h2>
        <ul>
          <li>
            <a href="#raiseErrorInRender" onClick={this.raiseErrorInRender}>
              Raise the error in render
            </a>
          </li>
          <li>
            <a href="#raiseErrorInUpdate" onClick={this.raiseErrorInUpdate}>
              Raise the error in componentDidUpdate
            </a>
          </li>
          <li>
            <Link href={{ pathname: '/', query: { raiseError: '1' } }}>
              <a>Raise error in getInitialProps of client-loaded page</a>
            </Link>
          </li>
          <li>
            <a href="/?raiseError=1">
              Raise error in getInitialProps of server-loaded page
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
