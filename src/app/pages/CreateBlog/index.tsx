import * as React from 'react';
import { useState, useEffect } from 'react';
import { BlogCreationStatus } from './BlogCreationStatus';
import { ChooseBlogCategory } from './ChooseBlogCategory';
import { ConfirmDetails } from './ConfirmDetails/Loadable';
import { ChooseTheme } from './ChooseTheme';
import { ChooseURL } from './ChooseURL/Loadable';
import { ChooseBlogTheme } from './ChooseBlogTheme';
import { GeneralDetails } from './GeneralDetails/Loadable';
import { SuccessInformational } from './SuccessInformational';
import { HashRouter, Route, useHistory, useLocation } from 'react-router-dom';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
export const CreateBlog = () => {
  const history = useHistory();
  const [data, setData] = useState({ 
    "/": {
      name: "",
      description: "",
      thumbnail: ""
    },
    "/choose-url": {
      username: ""
    }
  });
  const location = useLocation();

  const [ _hash, setHash ] = useState(location.hash);
  const hash = _hash.replace("#", "");
  
  const func = event => {
      setHash(location.hash) 
  }
  const STEP_1 = "/";
  const STEP_2 = "/blog-category";
  const STEP_3 = "/choose-url";
  const STEP_4 = "/choose-theme";
  const STEP_5 = "/confirm-details";
  
  useEffect(() => {
      // eslint-disable-next-line no-restricted-globals
      addEventListener('hashchange', func);
      // eslint-disable-next-line no-restricted-globals
      return () => removeEventListener('hashchange', func);
  })
  const STEPS = [ STEP_1, STEP_2, STEP_3, STEP_4, STEP_5 ] ;
  const getDoneClassOrEmpty = STEP => {
      const index = STEPS.indexOf(STEP);
      const _current = STEPS.indexOf(hash);
      const current = _current === -1 ? 0 : _current
      const same = index === current;
      const more = current > index;
      if (same) { return "current"; }
      else if (more) return "done"
      return ""
  }
  const isStepDisabled = STEP => {
    const index = STEPS.indexOf(STEP);
    const _current = STEPS.indexOf(hash);
    const current = _current === -1 ? 0 : _current
    const less = current < index;
    if (less) return true;
    return false;
  }

  const components = [
    { Component: GeneralDetails, path: '/' },
    { Component: ChooseBlogCategory, path: '/blog-category' },
    { Component: ChooseURL, path: '/choose-url' },
    { Component: ChooseTheme, path: '/choose-theme' },
    { Component: ConfirmDetails, path: '/confirm-details' },
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
  console.log("DATAAAA", data)
  return (
    <div className="card-body form-wizard-wrapper wizard clearfix">
        <div className="steps clearfix">
          <div
            role="tablist"
            style={{ display: "flex", marginLeft: "1vw", marginBottom: "1vh" }}
          >
            <div
              role="tab"
              className={ "first " + getDoneClassOrEmpty(STEP_1) }
              aria-disabled="false"
              aria-selected="false"
            >
              <a
                data-disabled={isStepDisabled(STEP_1)}
                id="form-horizontal-t-0"
                href="#"
                aria-controls="form-horizontal-p-0"
              >
                <span className="number">1.</span> General details
              </a>
            </div>
            <div
              role="tab"
              className={ getDoneClassOrEmpty(STEP_2) }
              aria-disabled="false"
              aria-selected="false"
            >
              <a
                data-disabled={isStepDisabled(STEP_2)}
                id="form-horizontal-t-1"
                href="#blog-category"
                aria-controls="form-horizontal-p-1"
              >
                <span className="number">2.</span> Category
              </a>
            </div>
            <div
              role="tab"
              className={ getDoneClassOrEmpty(STEP_3) }
              aria-disabled="false"
              aria-selected="true"
            >
              <a
                data-disabled={isStepDisabled(STEP_3)}
                id="form-horizontal-t-2"
                href="#choose-url"
                aria-controls="form-horizontal-p-2"
              >
                <span className="number">3.</span> Choose URL
              </a>
            </div>
            <div
              role="tab"
              className={ "last " + getDoneClassOrEmpty(STEP_4) }
              aria-disabled="false"
              aria-selected="false"
            >
              <a
                data-disabled={isStepDisabled(STEP_4)}
                id="form-horizontal-t-3"
                href="#choose-theme"
                aria-controls="form-horizontal-p-3"
              >
                <span className="number">4.</span> Choose theme
              </a>
            </div>
            <div
              role="tab"
              className={ getDoneClassOrEmpty(STEP_5) }
              aria-disabled="false"
              aria-selected="false"
            >
              <a
                data-disabled={isStepDisabled(STEP_5)}
                id="form-horizontal-t-4"
                href="#confirm-details"
                aria-controls="form-horizontal-p-4"

              >
                <span className="number">5.</span> Confirm details
              </a>
            </div>
          </div>
        </div>

        <HashRouter>
          {components.map(({ Component, path, sendDataObject }, i) => {
            const previousDisabled = i < 1;
            const previousStep = () => {
              var component = components[i - 1];
              window.location.hash = '#' + component.path;
            };
            const nextDisabled = i > components.length
            const nextStep = () => {
              var component = components[i + 1];
              window.location.hash = '#' + component.path;
            };
            const sendValueToParent = value => {
              const newData = { ...data, [path]: value };
              setData(newData);
            };
            console.log({ data });
            const extraProps: any = {};
            if (sendDataObject) extraProps.parentData = data;
            const onPreviousClick = data => e => {
              e?.preventDefault()
              sendValueToParent(data);
              previousStep()
            }
            const handleSubmit = () => {
              const {
                name, description, thumbnail
              } = data["/"]
              const {
                id: BlogCategoryId
              } = data["/blog-category"]
              const BlogThemeId = data["/choose-theme"]
              const { username } = data["/choose-url"]

              console.log({
                name, description, thumbnail,
                BlogCategoryId, BlogThemeId, username
              })
              
            }
            const onContinueClick = data => e => {
              e?.preventDefault()
              
              const shouldSubmit = path === "/confirm-details";
              console.log({ shouldSubmit, path })

              if (!shouldSubmit){
                sendValueToParent(data);
                return nextStep()
              }
              return handleSubmit();
            }
            return (
              <>
              <Route
                component={props => (
                  <>
                    <Component
                      {...props}
                      sendValueToParent={sendValueToParent}
                      parentValue={data[path]}
                      parentData={data}
                      nextStep={nextStep}
                      nextStepDisabled={!data[path]}
                      onPreviousClick={!previousDisabled && onPreviousClick}
                      onContinueClick={!nextDisabled && onContinueClick}
                      STEPS={STEPS}
                      {...extraProps}
                    />
                  </>
                )}
                path={path}
                exact
              />
              </>
            );
          })}
        </HashRouter>
    </div>
  );
};
