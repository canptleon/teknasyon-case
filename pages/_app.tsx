import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import '@/public/globals.css';

interface PageProps {
  statusCode?: number;
  query?: any;
  domain?: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  const domain = ctx.ctx.req
    ? `https://${ctx.ctx.req.headers.host}`
    : ''; 
  const pageProps: PageProps = {
    statusCode: ctx.ctx.res?.statusCode,
    query: ctx.router.query,
    domain,
  };

  return {
    ...appProps,
    pageProps,
  };
};

export default MyApp;
