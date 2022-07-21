import React from 'react';
import { ChooseMediaModal } from '../ChooseMediaModal';

type UploadFileType = {
  onChange: Function;
  className?: string;
  style?: any;
};

const UploadFile = ({ onChange, className, style = {} }: UploadFileType) => {
  const [file, setFile]: any = React.useState(undefined);
  const [fileSource, setFileSource]: any = React.useState(undefined);

  return (
    <div className={className || 'col-2 card-body m-auto'} style={style}>
      <ChooseMediaModal />
      <div
        className={'dropify-wrapper ' + (fileSource ? 'hide-children' : '')}
        style={{
          height: '313.993px',
          backgroundImage: `url(${fileSource})`,
        }}
      >
        <div className="dropify-message">
          <span className="file-icon">
            {' '}
            <p>Drag and drop a file here or click</p>
          </span>
          <p className="dropify-error">Ooops, something wrong appended.</p>
        </div>
        <div className="dropify-loader" />
        <div className="dropify-errors-container">
          <ul />
        </div>
        <input
          type="file"
          id="input-file-now-custom-2"
          className="dropify"
          data-height={500}
          onChange={(event: any) => {
            setFile(event.target.files[0]);
            let reader: any = new FileReader();
            let file = event.target.files[0];
            reader.onload = () => {
              setFileSource(reader.result);

              if (onChange) onChange({ file, fileSource: reader.result });
            };
            reader.readAsDataURL(file);
          }}
        />
        <button type="button" className="dropify-clear">
          Remove
        </button>
        <div className="dropify-preview">
          <span className="dropify-render" />
          <div className="dropify-infos">
            <div className="dropify-infos-inner">
              <p className="dropify-filename">
                <span className="file-icon" />{' '}
                <span className="dropify-filename-inner" />
              </p>
              <p className="dropify-infos-message">
                Drag and drop or click to replace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UploadFile };
