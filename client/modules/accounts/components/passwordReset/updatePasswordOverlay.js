import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button, TextField, Translation } from "/imports/plugins/core/ui/client/components";

class UpdatePasswordOverlay extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    loginFormMessages: PropTypes.func,
    messages: PropTypes.object,
    onCancel: PropTypes.func,
    onError: PropTypes.func,
    onFormSubmit: PropTypes.func,
    uniqueId: PropTypes.string
  }

  constructor() {
    super();

    this.state = {
      password: "",
      showSpinner: true
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ showSpinner: false });
  }

  handleFieldChange = (event, value, field) => {
    this.setState({
      [field]: value
    });
  }

  handleSubmit = (event) => {
    if (this.props.onFormSubmit) {
      this.props.onFormSubmit(event, this.state.password);
    }
  }

  handleCancel = (event) => {
    if (this.props.onCancel) {
      this.props.onCancel(event);
    }
  }

  renderFormMessages() {
    if (this.props.loginFormMessages) {
      return (
        <div>
          {this.props.loginFormMessages()}
        </div>
      );
    }
  }

  renderPasswordErrors() {
    return (
      <span className="help-block">
        {this.props.onError(this.props.messages.errors && this.props.messages.errors.password) &&
        this.props.messages.errors.password.map((error, i) => (
          <Translation
            key={i}
            defaultValue={error.reason}
            i18nKey={error.i18nKeyReason}
          />
        ))
        }
      </span>
    );
  }

  renderSpinnerOnWait() {
    if (this.props.isDisabled === true) {
      return (
        <div className="col-sm-6" style={{ textAlign: "center" }}>
          <i className="fa fa-spinner fa-spin"/>
        </div>
      );
    }
    return (
      <div className="col-sm-6">
        <Button
          className="btn-block"
          primary={true}
          bezelStyle="solid"
          i18nKeyLabel="accountsUI.updatePasswordAndContinue"
          label="Update and continue"
          type="submit"
        />
      </div>
    );
  }

  renderSpinnerOnLoad() {
    return (
      <div className="spinner-container">
        <div className="spinner"/>
      </div>
    );
  }

  render() {
    const passwordClasses = classnames({
      "form-group": true,
      "has-error has-feedback": this.props.onError(this.props.messages.errors && this.props.messages.errors.password)
    });
    const { showSpinner } = this.state;

    return (
      <div>
        {this.props.isOpen === true &&
        <div>
          <div className="modal-backdrop fade in" id={`modal-backdrop-${this.props.uniqueId}`}/>
          <div className="modal fade in" id={`modal-${this.props.uniqueId}`} style={{ display: "block" }}>
            <div className="modal-dialog">
              {showSpinner ? this.renderSpinnerOnLoad() :
                <form className="modal-content" onSubmit={this.handleSubmit}>
                  <div className="modal-header">
                    <h4 className="modal-title">
                      <Translation defaultValue="Update Your Password" i18nKey="accountsUI.updateYourPassword"/>
                    </h4>
                  </div>

                  <div className="modal-body">
                    <div className="login-form">

                      {this.renderFormMessages()}

                      <div className={passwordClasses}>
                        <TextField
                          i18nKeyLabel="accountsUI.password"
                          label="Password"
                          name="password"
                          type="password"
                          id={`password-${this.props.uniqueId}`}
                          value={this.state.password}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderPasswordErrors()}
                      </div>

                    </div>
                  </div>

                  <div className="modal-footer">
                    {this.renderSpinnerOnWait()}

                    <div className="col-sm-6">
                      <Button
                        className="btn-block"
                        status="danger"
                        bezelStyle="solid"
                        i18nKeyLabel="app.cancel"
                        label="Cancel"
                        type="button"
                        onClick={this.handleCancel}
                        disabled={this.props.isDisabled}
                      />
                    </div>
                  </div>

                </form>
              }
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default UpdatePasswordOverlay;
