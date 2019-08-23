import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  console.log("newColor", newColor);

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        colors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            color = res.data;
          }
          return color;
        });
        updateColors(colors);
      })
      .catch(err => console.log(err));
    setColorToEdit(initialColor);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log("colors data", res);
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", newColor)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response));
    setNewColor(initialColor);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <h1>Add A New Color</h1>
      <form onSubmit={addColor}>
        <input
          type="text"
          name="color"
          placeholder="Color Name"
          value={newColor.color}
          onChange={e =>
            setNewColor({
              ...newColor,
              color: e.target.value
            })
          }
        />
        <input
          type="text"
          name="hex"
          placeholder="Hex Code"
          value={newColor.code.hex}
          onChange={e =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })
          }
        />
        <button>Add New Color</button>
      </form>
    </div>
  );
};

export default ColorList;
