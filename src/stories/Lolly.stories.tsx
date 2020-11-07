import React from "react"
import Lolly from "../components/Lolly";

export default {
    component: Lolly,
    title: 'Lolly',
    argTypes: {
        fillLollyTop: { control: 'color' },
        fillLollyMiddle: { control: 'color' },
        fillLollyBottom: {control: 'color'}
    },
};

export const LollyDefault = (args) => {
    return (
        <Lolly {...args} />
    )
}

LollyDefault.args = {
    fillLollyTop: "#d52358",
    fillLollyMiddle: "#e95946",
    fillLollyBottom: "#deaa43"
}