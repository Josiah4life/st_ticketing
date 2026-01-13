import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className='container'>
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  // console.log(appContext.ctx)

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser)
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
//   // Instead of 'appContext', we just grab 'Component' and 'ctx' immediately
// AppComponent.getInitialProps = async ({ Component, ctx }) => {
//   const client = buildClient(ctx); // No more typing 'appContext.ctx'!
//   const { data } = await client.get('/api/users/currentuser');

//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps, ...data };
// };

// console.log(data);
// console.log(`Data is:`, pageProps)
