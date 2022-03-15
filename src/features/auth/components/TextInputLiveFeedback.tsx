import { useState } from 'react';
import { useField } from 'formik';

const TextInputLiveFeedback = ({...props}: { [x: string]: any; name: string; }) => {
    const [field, meta] = useField(props);
  
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = meta.touched;
  
    return (
      <div
        className={`form-control ${
          showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
        }`}
      >
        <div className="flex items-center space-between">
          <label htmlFor={props.id}>{props.label}</label>{' '}
        </div>
        <input
          {...props}
          {...field}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}
        />
        <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
          {showFeedback ? (
            <div
              id={`${props.id}-feedback`}
              aria-live="polite"
              className="feedback error-message"
            >
              {meta.error ? meta.error : null}
            </div>
          ) : null}
          {props.helpText}
        </div>
      </div>
    );
  };

  export default TextInputLiveFeedback;