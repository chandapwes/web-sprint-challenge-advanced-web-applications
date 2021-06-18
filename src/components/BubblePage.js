import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { editColorService, deleteColorService } from '../services/colorServices';
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";
import { setState } from "expect";
import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);


  BubblePage.componentDidMount(fetchColorService())

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${id}`, editColor)
    .then(res => {
      setEditing(editing)
    })
    .catch(err => {
      console.log(err)
    })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/123`)
    .then(res => {
      localStorage.removeItem('token', colorToDelete)
      setColors(colors)
    })
    .catch(err => {
      console.log(err)
    })

  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
