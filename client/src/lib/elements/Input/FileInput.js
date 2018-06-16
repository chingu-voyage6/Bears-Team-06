import React from 'react';
import PropTypes from 'prop-types';

class FileInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    show: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.element,
  };

  static defaultProps = {
    show: false,
    style: {},
  };

  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  handleFileChange = e => {
    const files = e.target.files;
    if (files.length > 0) {
      this.props.onChange(files);
    }
  };

  render() {
    let { show, style, children, ...props } = this.props;
    let updatedChild = null;

    if (children) {
      updatedChild = React.cloneElement(children, {
        onClick: () => this.fileInput.current.click(),
      });
    } else {
      show = true;
    }

    return (
      <React.Fragment>
        <input
          {...props}
          type="file"
          ref={this.fileInput}
          onChange={this.handleFileChange}
          style={show ? style : { ...style, display: 'none' }}
        />
        {updatedChild}
      </React.Fragment>
    );
  }
}

export { FileInput };
