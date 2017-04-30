import React from 'react'
import ReactPDF from 'react-pdf';
import UpperHeaderSection from './UpperHeaderSection.jsx'
import FooterSection from './FooterSection.jsx'

class PurchaseOrder extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <UpperHeaderSection/>
                <ReactPDF file={`http://139.59.102.212:9002/payslip/${this.props.match.params.purchaseOrderId}`}/>
                <form method="GET" action={`http://139.59.102.212:9002/payslip/${this.props.match.params.purchaseOrderId}`}>
                <button className="btn btn-primary" type="submit">
                    Download
                </button>
                </form>
                <FooterSection/>
            </div>
        )
    }
}

export default PurchaseOrder