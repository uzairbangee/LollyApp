import React from "react"
import Lolly from "../components/Lolly";

export default {
    component: Lolly,
    title: 'Lolly',
};

export const LollyDefault = () => {
    return (
        <Lolly fillLollyTop="#d52358" fillLollyMiddle="#e95946" fillLollyBottom="#deaa43" />
    )
}