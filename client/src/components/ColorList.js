import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // console.log(colorToEdit.id)
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get(`/api/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    setEditing(false)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(() => {
        axiosWithAuth()
          .get(`/api/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    setEditing(false)
  };

  const handleAdd = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, newColor)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
    setNewColor(initialColor)
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
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

      <form onSubmit={handleAdd}>
        <label>color name: <input
          onChange={e =>
            setNewColor({ ...newColor, color: e.target.value })
          }
          value={newColor.color}
        /></label>
        <label>hex code: <input
          onChange={e =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })
          }
          value={newColor.code.hex}
        /></label>
        <button type='submit'>Add color</button>
      </form>

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

    </div>
  );
};

export default ColorList;
