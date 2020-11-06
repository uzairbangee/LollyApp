import React, {useEffect} from 'react'
import Layout from "../components/Layout"
import { gql, useQuery } from "@apollo/client";
import Lolly from "../components/Lolly"


const RUNTIME = gql`
    query lollyByPath($path: String!){
        lollyByPath(path: $path) {
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
`

export default ({location}) => {
    const path_name = location.pathname.split('/')[2];
    console.log(path_name)
    const {loading, error, data} = useQuery(RUNTIME, {
        variables : {
            path: path_name
        }
    })

    console.log(data);
    console.log(error);

    return (
        <Layout>
            {
                !data || error &&
                <p>Sorry on wrong page</p>
            }
            {
                loading
                &&
                <p>Getting Invoice Ready...</p>
            }
            {
                data &&
                <>
                <p>Your Invoice for Order No. {data.lollyByPath.path} </p>
                <div className="lollyFormDiv">
                    <div>
                        <Lolly fillLollyTop={data.lollyByPath.flavourTop} fillLollyMiddle={data.lollyByPath.flavourMiddle} fillLollyBottom={data.lollyByPath.flavourBottom} />
                    </div>
                    <div className="invoice">
                        <h4 className="invoice_head">INVOICE # {data.lollyByPath.path}</h4>
                        <p>{data.lollyByPath.name}</p>
                        <p>{data.lollyByPath.email}</p>
                        <p>{data.lollyByPath.address}</p>
                        <p>{data.lollyByPath.phone}</p>
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
                                    <td>{data.lollyByPath.quantity}</td>
                                    <td>${data.lollyByPath.price}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="total"><b>Total : </b> ${data.lollyByPath.price}</p>
                        <h6 className="billed">You will be billed at doorstep</h6>
                    </div>
                </div>
                </>
            }
        </Layout>
    )
}