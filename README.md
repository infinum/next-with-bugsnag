# next-with-bugsnag

Bugnag HOC for Next.js.

## How to use

Install the package with npm

```sh
npm install next-with-bugsnag
```

or with yarn

```sh
yarn add next-with-bugsnag
```

Create the HOC using a basic setup.

```js
import { ErrorInfo } from "react";
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app';
import Error from 'next/error';
import { IBugsnagNextAppContext, withBugsnagNextApp, IBugsnagProps } from 'next-with-bugsnag';

const user = {
  id: '1',
  name: 'Test User',
  email: 'test.user@example.com',
};

interface IAppProps {
  errorCode?: number;
}

class MyApp extends App<IAppProps & IBugsnagProps> {
  public static async getInitialProps(
    props: NextAppContext & IBugsnagNextAppContext,
  ): Promise<DefaultAppIProps & IAppProps> {
    const {
      Component,
      ctx,
    } = props;


    let pageProps = {}
    let errorCode!: number;

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx)
      } catch (error) {
        ctx.bugsnag.notify(error, {
          user,
        });
        errorCode = 500;
      }
    }

    return {
      pageProps,
      errorCode,
    };
  }


  public componentDidCatch(error: any, info: ErrorInfo) {
    this.props.bugsnag.notify(error, {
      user,
    });

    super.componentDidCatch(error, info);
  }

  public render() {
    const {
      Component,
      pageProps,
      errorCode,
    } = this.props;

    if (errorCode) {
      return <Error statusCode={errorCode} />
    }

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withBugsnagNextApp({
  apiKey: 'BUGSNAG_API_KEY',
  appVersion: '1.0.0',
  releaseStage: 'production',
})(MyApp);

```


## How it works

`next-with-bugsnag` will create a Higher-Order Component (HOC) with your configuration that can be used in `pages/_app` to catch bugs and send notification to Bugsnag.


## TODO
- [ ] Write tests!
