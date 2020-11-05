import React from 'react'
import { graphql } from 'gatsby';
import Layout from "../components/Layout"
import Lolly from "../components/Lolly"

export default ({data}) => {
    console.log(data)
    const {findLollyByID} = data.fauna
    return (
        <Layout>
            <p>Your Invoice for Order No. {findLollyByID.path} </p>
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={findLollyByID.flavourTop} fillLollyMiddle={findLollyByID.flavourMiddle} fillLollyBottom={findLollyByID.flavourBottom} />
                </div>
                <div className="invoice">
                    <h4 className="invoice_head">INVOICE # {findLollyByID.path}</h4>
                    <p>{findLollyByID.name}</p>
                    <p>{findLollyByID.email}</p>
                    <p>{findLollyByID.address}</p>
                    <p>{findLollyByID.phone}</p>
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
                                <td>{findLollyByID.quantity}</td>
                                <td>${findLollyByID.price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="total"><b>Total : </b> ${findLollyByID.price}</p>
                    <h6 className="billed">You will be billed at doorstep</h6>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($id: ID!){
        fauna{
            findLollyByID(id : $id){
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