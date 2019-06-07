import { ErrorInfo } from "react";
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app';
import getConfig from 'next/config';
import Error from 'next/error';
import { IBugsnagNextAppContext, withBugsnagNextApp, IBugsnagProps } from '../../dist';

const { publicRuntimeConfig } = getConfig();

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

    // @ts-ignore
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
  apiKey: publicRuntimeConfig.bugsnagApiKey,
  appVersion: publicRuntimeConfig.appVersion,
  releaseStage: 'production',
})(MyApp);
