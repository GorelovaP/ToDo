import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("Button was presses inside the form ")

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}