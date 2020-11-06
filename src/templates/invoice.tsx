import React, {useEffect} from 'react'
import { graphql } from 'gatsby';
import Layout from "../components/Layout"
import Lolly from "../components/Lolly"

export const query = graphql`
    query MyQuery($lollypath: String!){
        fauna{
            LollyByPath(path: $lollypath){
                name
                email
                phone
                address
                quantity
                price
                flavourTop
                flavourMiddle
                flavourBottom
                path
            }
        }
    }
`

const Invoice = ({data}) => {
    console.log(data);
    const {LollyByPath} = data.fauna

    return (
        <Layout>
            <p>Your Invoice for Order No. {LollyByPath.path} </p>
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={LollyByPath.flavourTop} fillLollyMiddle={LollyByPath.flavourMiddle} fillLollyBottom={LollyByPath.flavourBottom} />
                </div>
                <div className="invoice">
                    <h4 className="invoice_head">INVOICE # {LollyByPath.path}</h4>
                    <p>{LollyByPath.name}</p>
                    <p>{LollyByPath.email}</p>
                    <p>{LollyByPath.address}</p>
                    <p>{LollyByPath.phone}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Lollies</td>
                                <td>{LollyByPath.quantity}</td>
                                <td>${LollyByPath.price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="total"><b>Total : </b> ${LollyByPath.price}</p>
                    <h6 className="billed">You will be billed at doorstep</h6>
                </div>
            </div>
        </Layout>
    )
}

export default Invoice;