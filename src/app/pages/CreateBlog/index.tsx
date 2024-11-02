// @ts-nocheck
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BlogCreationStatus } from './BlogCreationStatus';
import { ChooseBlogCategory } from './ChooseBlogCategory';
import { ChooseBlogFeatures } from './ChooseBlogFeatures';
import { ChooseBlogLogo } from './ChooseBlogLogo';
import { ChooseBlogName } from './ChooseBlogName';
import { ChooseBlogTheme } from './ChooseBlogTheme';
import { InformationalStep1 } from './InformationalStep1';
import { SuccessInformational } from './SuccessInformational';
import { HashRouter, Route, useHistory } from 'react-router-dom';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
export const CreateBlog = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const components = [
    { Component: InformationalStep1, path: '/' },
    { Component: ChooseBlogCategory, path: '/blog-category' },
    { Component: ChooseBlogName, path: '/blog-name' },
    { Component: ChooseBlogLogo, path: '/blog-logo' },
    { Component: ChooseBlogTheme, path: '/blog-theme' },
    { Component: ChooseBlogFeatures, path: '/blog-features' },
    {
      Component: BlogCreationStatus,
      path: '/setup-status',
      sendDataObject: true,
    },
    {
      Component: SuccessInformational,
      path: '/success',
      sendDataObject: true,
    },
  ];

  return (
    <HashRouter>
      {components.map(({ Component, path, sendDataObject }, i) => {
        const nextStep = () => {
          var component = components[i + 1];
          if (component.path === '/blog-theme')
            component = components[components.length - 2];
          else if (!component) throw new Error('Dev-error');
          window.location.hash = '#' + component.path;
        };
        const sendValueToParent = value => {
          const newData = { ...data, [path]: value };
          setData(newData);
        };
        console.log({ data });
        const extraProps: any = {};
        if (sendDataObject) extraProps.parentData = data;
        return (
          <Route
            component={props => (
              <>
                <Component
                  {...props}
                  sendValueToParent={sendValueToParent}
                  parentValue={data[path]}
                  nextStep={nextStep}
                  nextStepDisabled={!data[path]}
                  {...extraProps}
                />
              </>
            )}
            path={path}
            exact
          />
        );
      })}
    </HashRouter>
  );
};
