import React, {Component} from 'react'

//import PropTypes from 'prop-types'

class VariantFromAttributes extends Component {
    render() {
        const {variant, variantIndex} = this.props

        return (
            <>
                {
                    variant.options.map((option, index) => (
                        <td key={`variant_${variantIndex}_option_${index}`}>
                            {option.name}
                        </td>
                    ))
                }
            </>
        )
    }
}

//VariantFromAttributes.defaultProps = {}

//VariantFromAttributes.propTypes = {}

export default VariantFromAttributes
