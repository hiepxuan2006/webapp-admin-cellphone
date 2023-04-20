import React, { Component } from "react";
import { Input } from "reactstrap";

//import PropTypes from 'prop-types'

class VariantDefault extends Component {
  _handleChangeInput = (e) => {
    const { variantIndex, variants, onChangeProduct } = this.props;
    const newVariants = variants.map((variant, index) => {
      return {
        ...variant,
        is_default: index === variantIndex && e.target.checked,
      };
    });

    onChangeProduct("variants", newVariants);
  };

  render() {
    const { variant, variantIndex } = this.props;

    return (
      <td className="VariantDefault">
        <div className="text-center">
          <Input
            id={`inputDefaultVariant_${variantIndex}`}
            type="radio"
            name="is_default"
            checked={variant.is_default}
            disabled={!variant.is_selected}
            onChange={this._handleChangeInput}
          />
        </div>
      </td>
    );
  }
}

//VariantDefault.defaultProps = {}

//VariantDefault.propTypes = {}

export default VariantDefault;
